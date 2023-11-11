export interface GetMessagesResponseBody {
  message: string
  messages: Message[]
}

export interface Message {
  id: number
  status: string
  description: string
  patientName: string
  patientPhone: string
  patientEmail: string
  createdAt: string
  updatedAt: string
  userId: number
}
