
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

