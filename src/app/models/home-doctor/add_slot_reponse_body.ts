export interface AddSlotResponseBody {
  message: string
  newSlot: NewSlot
}

export interface NewSlot {
  status: string
  id: number
  date: string
  userId: number
  updatedAt: string
  createdAt: string
}
