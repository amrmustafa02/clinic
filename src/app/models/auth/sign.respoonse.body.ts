export interface SignInResponseBody {
    message: string
    user: User
    token: string
}

export interface User {
    id: number
    name: string
    phone: string
    email: string
    age: number
    password: string
    gender: string
    role: string
    specialization: string
    createdAt: string
    updatedAt: string
}
