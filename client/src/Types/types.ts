export interface signup_payload_datatype {
    name: string,
    email: string,
    password: string
};
export interface login_payload_datatype {
    email: string,
    password: string
};


//Initial State type
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isEmailValid: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Link {
    id: number;
    url: string;
    shortCode: string;
    createdAt: string; // You might consider using Date if you want to handle dates as Date objects
    updatedAt: string; // Same as above
    userId: number;
}

type LinksArray = Link[];

export interface InitialStateType {
    loading: boolean;
    error: string | null;
    user: User | null;
    links: LinksArray;
}

export type ProfileResponse = {
  success: boolean;
  user: User;
  links: LinksArray;
};

export type LogoutResponse = {
    success: boolean;
    message: string;
}
