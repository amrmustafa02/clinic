export interface SearchDoctorBody {
    message: string
    doctor: Doctor[]
}

export interface Doctor {
    id: number
    name: string
    phone: string
    email: string
    age: number
    gender: string
    role: string
    specialization: string
    createdAt: string
    updatedAt: string
    slots: Slot[]
}

export interface Slot {
    id: number
    date: string
    status: string
    createdAt: string
    updatedAt: string
    userId: number
}
