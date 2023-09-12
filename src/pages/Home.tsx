import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piu } from "../types/Pius";
import NavTitle from "../components/NavTitle";
import { PiupiuList } from "../components/PiupiuList";
import { usePagination } from "../hooks/useScroll";
import { piuComponentHeight } from "../consts";
import { User } from "../types/Users";
import { routes } from "../routes";
import { createNewPosts, getPius } from "../service";
import { useAuth } from "../context/authContext";

export const Home = () => {
  const [textValue, setTextValue] = useState("");
  const [piupius, setPiupius] = useState<Piu[]>([]);
  const [newData, setNewData] = useState<Piu[] | undefined>();
  const [addingPiupiu, setAddingPiupiu] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = Math.ceil(window.screen.height / piuComponentHeight);
  const { user } = useAuth();

  const { scrollTop } = usePagination({
    onBottomEnter: () => setPage(page + 1),
    onTopEnter: () => {},
    onTopLeave: () => {},
    bottomRef,
    topRef,
    refreshVariable: piupius,
  });

  const handleSubmit = async (e: React.FormEvent, formValue?: string) => {
    e.preventDefault();
    setAddingPiupiu(true);
    createNewPosts(formValue as string)
      .then(() => {
        setTextValue("");
      })
      .finally(() => {
        setAddingPiupiu(false);
      });
  };

  const getPostsHome = async () => {
    try {
      const response = await getPius({ page: page, per_page: 20 });

      setPiupius([...piupius, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostsHome();
  }, [page]);

  return (
    <div ref={topRef} className="relative">
      <NavTitle
        position="sticky"
        navOptions={[
          { title: "Para você", path: routes.home },
          { title: "Perseguindo", path: routes.following },
        ]}
        refreshButton={{
          newPosts: newData,
          onClick: () => {
            scrollTop();
          },
        }}
      >
        <h2 className="text-xl font-bold px-4 py-3 ">Casa</h2>
      </NavTitle>
      <NewPiupiu
        loading={addingPiupiu}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onSubmit={handleSubmit}
        user={user as User}
      />
      <PiupiuList
        initialLoading={isLoading}
        topRef={topRef}
        bottomRef={bottomRef}
        loading={isLoading}
        piupius={piupius}
        onChange={() => {}}
      />
    </div>
  );
};
