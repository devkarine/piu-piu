import { useEffect, useState } from "react";
import { NavHeader } from "../components/NavHeader";
import NavTitle from "../components/NavTitle";
import ProfilePic from "../components/ProfilePic";
import { Username } from "../components/Username";
import { User } from "../types/Users";
import { Outlet, useParams } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { ProfileEditForm } from "../components/ProfileEditForm";
import { Dialog } from "../components/Dialog";
import { routes } from "../routes";
import { getUsers, pacthUser } from "../service";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/authContext";

export const ProfileLayout = () => {
  const { setUser, user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { handle } = useParams();

  const editProfile = async (users: Partial<User>) => {
    try {
      await pacthUser({ handle, users });
      const dataUser = Object.assign(usersProfile?.user, users);
      localStorage.setItem("user", JSON.stringify(dataUser));
      setUser(dataUser);
      refetch();
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: usersProfile, refetch } = useQuery({
    queryKey: ["getProfile", handle],
    queryFn: async () => await getUsers(handle),
  });
  console.log(usersProfile);

  const handleDialogClick = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <NavHeader
        title={usersProfile?.user.name || ""}
        subtitle={`${usersProfile?.posts || 0} piadas`}
      />
      <NavTitle
        position="relative"
        navOptions={[
          { title: "Perfil", path: routes.profile(usersProfile?.user.handle) },
          {
            title: "Curtidas",
            path: routes.userLikes(usersProfile?.user.handle),
          },
        ]}
      >
        <section className="h-48 w-full bg-zinc-700" />
        <section className="relative mb-2 select-none px-3 w-full">
          <div className="min-h-[5rem] flex justify-end w-full">
            <div className="absolute -top-16 left-4 ">
              <ProfilePic
                border
                variant="reallyBig"
                userName={usersProfile?.user.name || ""}
                image={usersProfile?.user.image_url}
              />
            </div>

            {usersProfile?.user.handle === user?.handle &&  (

            <div
              onClick={handleDialogClick}
              className="absolute cursor-pointer rounded-full bg-zinc-950 hover:bg-zinc-900 p-6 right-4 top-4"
            >
              <BsFillPencilFill />
            </div>
            )}
          </div>
          

          <div>
            <Username size="xl" variant="column" user={usersProfile?.user} />
            <p className="text-white mt-3 text-sm">
              {usersProfile?.user.description}
            </p>
          </div>
        </section>
      </NavTitle>
      <Outlet />
      <Dialog
        onClose={() => {
          setDialogOpen(false);
        }}
        open={dialogOpen}
      >
        {usersProfile?.user && (
          <ProfileEditForm onSubmit={editProfile} user={usersProfile?.user} />
        )}
      </Dialog>
    </>
  );
};
