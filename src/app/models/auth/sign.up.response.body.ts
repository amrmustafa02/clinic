export interface SignUpResponseBody {
    message?: string;
    result?: Result;
    token?: string;
}

export interface Result {
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
