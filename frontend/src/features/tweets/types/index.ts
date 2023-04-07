import { z } from 'zod'

export interface ITweet {
  id: number
  text: string
  img?: string
  timeStamp: string
  userName: string
  userId: string
  userImg: string
}

export const NewTweetSchema = z.object({
  text: z
    .string()
    .min(1, { message: 'A tweet must contain at least on character' })
    .max(280, { message: 'Maximum 280 characters.' }),
})

export type NewTweetSchema = z.infer<typeof NewTweetSchema>
