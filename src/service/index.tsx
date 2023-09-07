import { backendRoutes } from "../routes";
import { LoginProps } from "../types/Users";
import { api } from "./api";


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