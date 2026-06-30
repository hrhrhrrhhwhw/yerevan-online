'use client';
import { AvatarProfilePhoto } from '@/components/base/avatar/avatar-profile-photo';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { StaffFormValues, staffSchema } from '@/schemas/staff.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Prisma } from '@/generated/prisma/client';
import { editStaff } from '../action/staff-edit';

type StaffEditFormProps = {
  staff: Prisma.StaffGetPayload<{
    select: {
      id: true;
      name: true;
      occupation: true;
      description: true;
      image: true;
      startTime: true;
      endTime: true;
    };
  }>;
};

export default function StaffEditForm({ staff }: StaffEditFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      id: staff.id,
      name: staff.name,
      occupation: staff.occupation,
      description: staff.description ?? '',
      image: staff.image ?? '',
      startTime: staff.startTime,
      endTime: staff.endTime,
    },
  });

  const [avatarUrl, setAvatarUrl] = useState(staff.image ?? '');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<StaffFormValues> = (data) => {
    console.log(data);
    startTransition(async () => {
      try {
        const res = await editStaff(data);

        if (!res.success) {
          console.log(res.error);
        }

        router.refresh();
        router.push('/dashboard/staff/edit');
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div>
      {avatarUrl && <AvatarProfilePhoto src={avatarUrl} alt='company' size='lg' />}
      <div className='my-8'>
        <CldUploadWidget
          uploadPreset='staff_image'
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            const info = result.info as CloudinaryUploadWidgetInfo;
            setAvatarUrl(info.secure_url);
            setValue('image', info.secure_url);
          }}
        >
          {({ open }) => (
            <Button
              size='xs'
              type='button'
              onClick={(e: any) => {
                e.preventDefault();
                open();
              }}
            >
              Загрузить изображение
            </Button>
          )}
        </CldUploadWidget>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
        <Controller name='name' control={control} render={({ field }) => <Input isRequired label='Имя сотрудника' placeholder='Aliah' {...field} />} />
        <Controller name='occupation' control={control} render={({ field }) => <Input label='Должность сотрудника' placeholder='Стилист' {...field} />} />
        <Controller name='description' control={control} render={({ field }) => <Input label='Описание что делает сотрудник' placeholder='Свадебные и вечерние прически' {...field} />} />
        <Controller
          name='startTime'
          control={control}
          render={({ field }) => <Input type='text' label='Начало рабочего дня' placeholder='09:00' isInvalid={!!errors.startTime} hint={errors.startTime?.message} {...field} />}
        />
        <Controller
          name='endTime'
          control={control}
          render={({ field }) => <Input type='text' label='Конец рабочего дня' placeholder='18:00' isInvalid={!!errors.endTime} hint={errors.endTime?.message} {...field} />}
        />
        <Button isLoading={isPending} showTextWhileLoading color='primary' size='lg' className='mt-6 max-w-2xs' type='submit' disabled={isPending}>
          Сохранить
        </Button>
      </form>
    </div>
  );
}
