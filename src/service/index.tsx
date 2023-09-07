import { backendRoutes } from "../routes";
import { LoginProps, SignupProps } from "../types/Users";
import { api } from "./api";

import { AxiosError } from "axios";


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


export async function getUsers(handle:string) {
    
    try {
       const response =  await api.get(`users/${handle}`)

       const {data} = response

        return data
    } catch (error) {
        console.log(error)
    }
  }