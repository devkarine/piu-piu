import { backendRoutes } from "../routes";
import { LoginProps, SignupProps, User } from "../types/Users";
import { api } from "./api";

import { AxiosError } from "axios";

interface GetPostsProps {
  handle: string | undefined;
  postsRoute: string;
}

interface PageProps {
  page: number;
  per_page: number;
}

interface EditProfile {
  handle: string | undefined;
  users: Partial<User>;
}
export async function login({ handle, password }: LoginProps) {
  try {
    const response = await api.post(backendRoutes.login, {
      handle,
      password,
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function signup({ name, handle, password }: SignupProps) {
  try {
    const response = await api.post(backendRoutes.signup, {
      name,
      handle,
      password,
    });

    const { data } = response;

    return data;
  } catch (error) {
    const AxiosError = error as AxiosError;
    return AxiosError.response?.status;
  }
}

export async function createNewPosts(message: string) {
  try {
    const tokenUser = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${tokenUser}`,
    };

    await api.post(backendRoutes.posts, { message }, { headers: headers });
  } catch (error) {
    const AxiosError = error as AxiosError;
    return AxiosError.response?.status;
  }
}

export async function findsPost(id: string) {
  try {
    const tokenUser = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${tokenUser}`,
    };

    const response = await api.get(backendRoutes.singlePiupiu.post(id), {
      headers: headers,
    });

    return response.data;
  } catch (error) {
    const AxiosError = error as AxiosError;
    return AxiosError.response?.status;
  }
}

export async function findsLikes(id: string) {
  try {
    const tokenUser = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${tokenUser}`,
    };

    const response = await api.get(backendRoutes.singlePiupiu.likes(id), {
      headers: headers,
    });

    return response.data.users;
  } catch (error) {
    const AxiosError = error as AxiosError;
    return AxiosError.response?.status;
  }
}

export async function getUsers(handle: string | undefined) {
  const tokenUser = localStorage.getItem("token");
  try {
    const response = await api.get(`users/${handle}`, {
      headers: {
        Authorization: `Bearer ${tokenUser}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts({ handle, postsRoute }: GetPostsProps) {
  const tokenUser = localStorage.getItem("token");
  try {
    const response = await api.get(
      postsRoute === "posts"
        ? `users/${handle}/posts`
        : `users/${handle}/likes`,
      {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPius({ page, per_page }: PageProps) {
  const tokenUser = localStorage.getItem("token");
  try {
    const response = await api.get(`pius/`, {
      headers: {
        Authorization: `Bearer ${tokenUser}`,
      },
      params: {
        page,
        per_page,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getLatestUsers() {
  const tokenUser = localStorage.getItem("token");
  try {
    const response = await api.get(`/users/latest`, {
      headers: {
        Authorization: `Bearer ${tokenUser}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const pacthUser = async ({ handle, users }: EditProfile) => {
  const tokenUser = localStorage.getItem("token");

  try {
    const response = await api.patch(
      `users/${handle}`,

      users,
      {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      }
    );

    return response.data;
  } catch (error) {}
};

export async function getPostReplies(id: string) {
  try {
    const tokenUser = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${tokenUser}`,
    };

    const response = await api.get(backendRoutes.singlePiupiu.replies(id), {
      headers: headers,
    });

    return response.data;
  } catch (error) {
    const AxiosError = error as AxiosError;
    return AxiosError.response?.status;
  }
}

export async function postReply(id: string, message: string) {
  try {
    const tokenUser = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${tokenUser}`,
    };

    await api.post(
      backendRoutes.singlePiupiu.reply(id),
      { message },
      { headers: headers }
    );
  } catch (error) {
    const AxiosError = error as AxiosError;
    return AxiosError.response?.status;
  }
}

export async function deleteLike(id: string, handle: string) {
  try {
    const tokenUser = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${tokenUser}`,
    };

    await api.delete(backendRoutes.singlePiupiu.like(id), {
      params: { handle },
      headers: headers,
    });
  } catch (error) {
    const AxiosError = error as AxiosError;
    return AxiosError.response?.status;
  }
}

export async function postLike(id: string, handle: string) {
  try {
    const tokenUser = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${tokenUser}`,
    };

    await api.post(
      backendRoutes.singlePiupiu.like(id),
      { handle: handle },
      { headers: headers }
    );
  } catch (error) {
    const AxiosError = error as AxiosError;
    return AxiosError.response?.status;
  }
}
