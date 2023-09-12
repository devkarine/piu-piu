import { useQuery } from "@tanstack/react-query";
import { PiupiuList } from "../components/PiupiuList";
import { useParams } from "react-router-dom";
import { getPosts } from "../service";

type ProfileProps = {
  postsRoute: "posts" | "likes";
};

export const Profile = ({ postsRoute }: ProfileProps) => {
  const { handle } = useParams();
  const { data: piupius, isLoading } = useQuery({
    queryKey: ["piupius", postsRoute],
    queryFn: async () => await getPosts({ handle, postsRoute }),
  });

  return (
    <>
      <main>
        <PiupiuList initialLoading={isLoading} piupius={piupius || []} />
      </main>
    </>
  );
};
