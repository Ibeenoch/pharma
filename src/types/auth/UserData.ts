export interface UserDataProps {
  userId?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  role?: string;
  passcode?: string;
  createdAt?: string;
  email: string;
  password: string;
}

export interface UserMappedProps {
    id: number,
    name: string,
    email: string,
    role: string,
    dateAdded: string,
    createdAt?: string;
}