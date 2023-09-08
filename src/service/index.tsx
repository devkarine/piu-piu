import { backendRoutes } from "../routes";
import { LoginProps, SignupProps } from "../types/Users";
import { api } from "./api";

import { AxiosError } from "axios";

interface GetPostsProps{
    handle: string | undefined
    postsRoute: string
}

interface PageProps{
    page: number
    per_page: number
}
export async function login({handle, password}: LoginProps){
    try {
        const response = await api.post(backendRoutes.login, {
            handle,
            password
        })

        const {data} = response

        return data

    } catch (error) {
        console.log(error)
    }
}

export async function signup({name, handle, password}: SignupProps){
    try {
        const response = await api.post(backendRoutes.signup, {
            name,
            handle,
            password
        })

        const {data} = response

        return data

    } catch (error) {
        const AxiosError = error as AxiosError
        return AxiosError.response?.status
    }
}


export async function getUsers(handle:string | undefined) {
    const tokenUser = localStorage.getItem('token')
    try {
       const response =  await api.get(`users/${handle}`,{
        headers: {
            Authorization: `Bearer ${tokenUser}`,
        }
        });

       

        return response.data
    } catch (error) {
        console.log(error)
    }
  }

  export async function getPosts({handle, postsRoute}: GetPostsProps) {
    const tokenUser = localStorage.getItem('token')
    try {
       const response =  await api.get(postsRoute === 'posts' ? `users/${handle}/posts`: `users/${handle}/likes`,{
        headers: {
            Authorization: `Bearer ${tokenUser}`,
        }
        });

       

        return response.data
    } catch (error) {
        console.log(error)
    }
  }

  export async function getPius({page, per_page}: PageProps) {
    const tokenUser = localStorage.getItem('token')
    try {
       const response =  await api.get(`pius/`,{
        headers: {
            Authorization: `Bearer ${tokenUser}`,
        },
        params:{
            page,
            per_page
        }
        });

       

        return response.data
    } catch (error) {
        console.log(error)
    }
  }