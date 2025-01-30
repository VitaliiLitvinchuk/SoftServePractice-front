import { http_json } from "../http/creator";

const endpoints = {
    getRoleById: "roles/get-by-id"
}

interface IRole {
    id: string,
    name: string
}

export default async function getRoleById(id: string) {
    return await http_json().get<IRole>(`${endpoints.getRoleById}?${new URLSearchParams({ id })}`);
}