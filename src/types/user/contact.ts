export interface ContactProps {
    $id?: string;
    $createdAt?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

export interface EmailSubProps {
    $id?: string;
    $createdAt?: string; 
    email: string;
}