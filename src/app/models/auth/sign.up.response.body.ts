export interface SignUpResponseBody {
    message?: string;
    result?: User;
    token?: string;
}

export interface User {
    id?: number
    name?: string
    email?: string
    password?: string
    age?: number
    phone?: string
    gender?: string
    updatedAt?: string
    createdAt?: string
}
