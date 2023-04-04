import { useGetUserQueryData } from '@/features/auth'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import * as Popover from '@radix-ui/react-popover'
import Logout from './logout'

const UserProfile = () => {
  const user = useGetUserQueryData()

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <section
          className="flex cursor-pointer select-none items-center justify-between rounded-full p-3 hover:bg-gray-100 xl:w-full"
          aria-label="Update dimensions"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={
                  user.profilePictureUrl === ''
                    ? '/twitter-default-pp.png'
                    : user.profilePictureUrl
                }
                className="h-auto w-full rounded-full object-cover"
                alt="photo profile"
                fill
              />
            </div>

            <div className="hidden text-sm xl:block">
              <p>{user.username}</p>
              <p className="text-dark-gray">@{user.username}</p>
            </div>
          </div>
          <EllipsisHorizontalIcon className="hidden h-5 w-5 xl:block" />
        </section>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="mb-3">
          <Logout />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default UserProfile
