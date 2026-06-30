'use client';
import { AvatarProfilePhoto } from '@/components/base/avatar/avatar-profile-photo';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Prisma } from '@/generated/prisma/client';
import { UserFormValues, userSchema } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateUserProfile } from '../action/edit-user';

type UserEditProps = {
  user: Prisma.UserGetPayload<{
    select: {
      id: true;
      name: true;
      lastName: true;
      image: true;
      phone: true;
    };
  }>;
};

export default function UserEditForm({ user }: UserEditProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      image: user.image,
      phone: user.phone,
    },
  });

  const [imageUrl, setImageUrl] = useState(user.image ?? '');

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    startTransition(async () => {
      try {
        const res = await updateUserProfile(user.id, {
          ...data,
          image: imageUrl,
        });

        if (!res.success) {
          return;
        }

        router.refresh();
        router.push(`/user/${user.id}`);
      } catch (e) {
        console.log(e);
      }
    });
  };
  return (
    <div>
      {imageUrl && <AvatarProfilePhoto verified size='md' alt={user?.name || ''} src={imageUrl} />}
      <div className='my-5'>
        <CldUploadWidget
          uploadPreset='user_avatars'
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            const info = result.info as CloudinaryUploadWidgetInfo;
            setImageUrl(info.secure_url);
            setValue('image', info.secure_url);
          }}
        >
          {({ open }) => (
            <Button
              type='button'
              onClick={(e: any) => {
                e.preventDefault();
                open();
              }}
            >
              Загрузить аватар
            </Button>
          )}
        </CldUploadWidget>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
        <Controller name='name' control={control} render={({ field }) => <Input  label='Имя' {...field} value={field.value ?? ''} />} />
        <Controller name='lastName' control={control} render={({ field }) => <Input label='Фамилия' {...field} value={field.value ?? ''} />} />
        <Controller name='phone' control={control} render={({ field }) => <Input label='Телефон' {...field} value={field.value ?? ''} />} />
        <Button isLoading={isPending} showTextWhileLoading color='primary' size='md' className='mt-6 max-w-2xs' type='submit' disabled={isPending}>
          Сохранить
        </Button>
      </form>
    </div>
  );
}
