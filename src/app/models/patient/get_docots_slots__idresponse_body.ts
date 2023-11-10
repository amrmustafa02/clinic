export interface GetDoctorSlotsByIdResponseBody {
  message: string
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
