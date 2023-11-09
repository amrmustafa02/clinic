export interface SlotsModel {
    message: string
    slots: Slot[]
  }
  
  export interface Slot {
    id: number
    date: string
    status: string
    createdAt: string
    updatedAt: string
    appointment?: Appointment
  }
  
  export interface Appointment {
    id: number
    status: string
    createdAt: string
    updatedAt: string
    user: Patient
  }
  
  export interface Patient {
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
  