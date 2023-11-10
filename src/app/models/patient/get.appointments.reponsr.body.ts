export interface GetAppointmentResponseBody {
  message: string
  appointments: Appointment[]
}

export interface Appointment {
  id: number
  status: string
  doctorId: number
  createdAt: string
  updatedAt: string
  user: User
  slot: Slot
}

export interface User {
  id: number
  name: string
  phone: string
  email: string
  age: number
  gender: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface Slot {
  id: number
  date: string
  status: string
  createdAt: string
  updatedAt: string
  userId: number
  user: User2
}

export interface User2 {
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
}
