import { UserDataProps, UserMappedProps } from "../../../types/auth/UserData";
import { formatDate } from "../../dateFormatter";

export const mappedUser = ( users: UserDataProps[]): UserMappedProps[] => {
    return  users.map((u, i) => ({
        id: i,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        role: u.role ?? '',
        dateAdded: formatDate(u.createdAt ?? ''),
       
    }))
}