import { useCallback, useEffect, useRef, useState } from "react";
import { CompletePiupiu } from "../components/CompletePiupiu";
import { NavHeader } from "../components/NavHeader";
import { Piu } from "../types/Pius";
import NewPiupiu from "../components/NewPiupiu";
import { PiupiuList } from "../components/PiupiuList";
import { User } from "../types/Users";
import { useAuth } from "../context/authContext";
import {
  deleteLike,
  findsLikes,
  findsPost,
  getPostReplies,
  postLike,
  postReply,
} from "../service";
import { useParams } from "react-router-dom";

export const SinglePiupiu = () => {
  const [replies, setReplies] = useState<Piu[]>();
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState<Piu>();
  const [userReply, setuserReply] = useState("");
  const [replying, setReplying] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();

  const getReplies = useCallback(async () => {
    const response = await getPostReplies(id as string);
    setReplies(response?.replies);
  }, [replies]);

  const handleSubmit = async (e: React.FormEvent, replyText?: string) => {
    setReplying(true);
    await postReply(id as string, replyText as string);
    setuserReply("");
    setReplying(false);
  };

  const handleLike = useCallback(async () => {
    if (liked) {
      await deleteLike(id as string, user?.handle as string);
    } else {
      postLike(id as string, user?.handle as string);
    }

    setLiked(!liked);
  }, [liked]);

  useEffect(() => {
    const getPost = async () => {
      const response = await findsPost(id as string);
      const responseLike = await findsLikes(id as string);
      getReplies();

      const userHandle = user?.handle;

      if (responseLike.includes(userHandle)) {
        setLiked(true);
      } else {
        setLiked(false);
      }

      setPost(response);
    };
    getPost();
  }, [liked, userReply]);

  return (
    <>
      <NavHeader title="Post" />
      <CompletePiupiu
        author={post?.author}
        body={post?.message || ""}
        reactions={{
          reactions: {
            comment: {
              active: false,
              total: post?.replies?.total,
            },
            repiu: {
              active: false,
              total: 0,
            },
            like: {
              total: post?.likes?.total,
              active: liked,
              onClick: handleLike,
            },
          },
        }}
      />
      <NewPiupiu
        onChange={(e) => setuserReply(e.target.value)}
        onSubmit={handleSubmit}
        user={user as User}
        variant="reply"
        value={userReply}
        loading={replying}
      />
      <PiupiuList piupius={replies} onChange={getReplies} />
    </>
  );
};
