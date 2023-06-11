'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  PillButton,
  Spinner,
  TextInput,
} from '@/components/elements'
import { useGetLoggedInUser } from '@/features/auth'
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import Image from 'next/image'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { EditProfileInput } from '../types'
import { useEditProfile } from '../hooks/use-edit-profile'

export const EditProfileModal = () => {
  const { data: user } = useGetLoggedInUser()
  const [openModal, setOpenModal] = useState(false)
  const [profilePictureImage, setProfilePictureImage] = useState(
    user?.profilePictureUrl
  )

  const methods = useForm<EditProfileInput>({
    resolver: zodResolver(EditProfileInput),
    defaultValues: {
      displayName: user?.displayName,
      bio: user?.bio,
    },
  })
  const { errors } = methods.formState

  const { mutateAsync, isLoading } = useEditProfile()

  const onSubmit: SubmitHandler<EditProfileInput> = async (data) => {
    const { displayName, bio, profilePictureFile } = data
    await mutateAsync({
      username: user?.username as string,
      displayName,
      bio,
      profilePictureFile: profilePictureFile[0] ?? null,
    })
    methods.reset()
    setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <PillButton
          className="absolute right-3 top-3"
          text="Edit profile"
          variant="white"
        />
      </DialogTrigger>
      <DialogContent
        hasCloseButton={false}
        className="relative min-h-[650px] w-[90vw] min-w-[300px] max-w-[570px] overflow-hidden"
      >
        <header className="absolute inset-0 z-50 flex h-14 items-center justify-between bg-white px-3">
          <div className="flex items-center gap-3">
            <DialogClose>
              <XMarkIcon className="h-5 w-5" />
            </DialogClose>
            <DialogTitle className="text-lg font-bold">
              Edit profile
            </DialogTitle>
          </div>
          <PillButton
            text={isLoading ? <Spinner /> : 'Save'}
            variant="white"
            onClick={methods.handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </header>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="relative mt-14 flex h-full w-full grow flex-col"
          >
            <section className="h-[27vw] max-h-[200px] w-full flex-shrink bg-slate-200"></section>
            <section className="relative h-auto min-h-[250px] p-5">
              <div className="absolute -top-8 left-5 h-16 w-16 overflow-hidden rounded-full border-2 border-white xs:-top-12 xs:h-[100px] xs:w-[100px] sm:-top-16 sm:h-[132px] sm:w-[132px] sm:border-4">
                <Image
                  src={profilePictureImage ?? '/twitter-default-pp.png'}
                  className="object-cover"
                  alt="profile picture"
                  fill
                />
                <div className="absolute left-[10px] top-[10px] z-50 h-fit w-fit rounded-full bg-black bg-opacity-50 p-2 xs:left-[28px] xs:top-[28px] sm:left-[42px] sm:top-[42px]">
                  <label
                    htmlFor="profile-picture-input"
                    className="cursor-pointer"
                  >
                    <CameraIcon className="h-6 w-6 text-white" />
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="profile-picture-input"
                    accept="image/*"
                    {...methods.register('profilePictureFile', {
                      onChange: (e) =>
                        setProfilePictureImage(
                          URL.createObjectURL(e.target.files[0])
                        ),
                    })}
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-6 xs:mt-20">
                <fieldset className="flex flex-col gap-1">
                  <TextInput
                    placeholder="Display name"
                    maxLength={50}
                    name="displayName"
                    className={
                      errors.displayName
                        ? 'border-red-600 focus:border-red-600'
                        : ''
                    }
                  />
                  {errors.displayName && (
                    <span className="text-xs text-red-600">
                      {errors.displayName.message}
                    </span>
                  )}
                </fieldset>
                <fieldset>
                  <textarea
                    className="h-[100px] w-full resize-none rounded border px-2 py-3 focus:border-primary-blue focus:outline-none"
                    placeholder="Bio"
                    maxLength={160}
                    {...methods.register('bio')}
                  />
                </fieldset>
              </div>
            </section>
            {errors.profilePictureFile && (
              <span>{errors.profilePictureFile.message as string}</span>
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
