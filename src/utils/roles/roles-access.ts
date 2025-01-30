import roles from ".";

interface IRolesAccess {
    [key: string]: string[] | null;
    guest: string[],
    admin: string[],
    user: string[]
}

export default {
    guest: [roles.GUEST],
    admin: [roles.GUEST, roles.USER, roles.ADMIN],
    user: [roles.GUEST, roles.USER]
} as IRolesAccess;
