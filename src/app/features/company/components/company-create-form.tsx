'use client';
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { companySchema, type CompanyFormValues } from '@/schemas/company.schema';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, InputBase } from '@/components/base/input/input';
import { TextArea } from '@/components/base/textarea/textarea';
import { InputGroup } from '@/components/base/input/input-group';
import { Button } from '@/components/base/buttons/button';
import { Select } from '@/components/base/select/select';
import { createCompanyProfile } from '../action/create-company';

interface CompanyCreateFormProps {
  categories: {
    id: string;
    label: string;
  }[];
}

export default function CompanyCreateForm({ categories }: CompanyCreateFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      image: '',
      address: '',
      phone: '',
      telegram: '',
      instagram: '',
      vkontakte: '',
    },
  });

  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<CompanyFormValues> = (data) => {
    startTransition(async () => {
      try {
        const res = await createCompanyProfile(data);

        if (!res.success) {
          console.log(res.error);
        }

        router.refresh();
        router.push('/dashboard');
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div>
      {imageUrl && (
        <div className='h-80 overflow-hidden rounded-4xl'>
          <Image src={imageUrl} alt='company' width={200} height={100} className='size-full object-cover' />
        </div>
      )}
      <div className='my-8'>
        <CldUploadWidget
          uploadPreset='company_image'
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            const info = result.info as CloudinaryUploadWidgetInfo;
            setImageUrl(info.secure_url);
            setValue('image', info.secure_url);
          }}
        >
          {({ open }) => (
            <Button
              size='sm'
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
        <Controller name='name' control={control} render={({ field }) => <Input isRequired label='Название компании' placeholder='Название компании' {...field} />} />
        <Controller
          name='category'
          control={control}
          render={({ field }) => (
            <Select isRequired label='Выберите категорию вашей компании' hint='Если вы делаете маникюр - выберите категорию "Красота"' items={categories} {...field}>
              {(c) => <Select.Item id={c.id}>{c.label}</Select.Item>}
            </Select>
          )}
        />
        <Controller name='description' control={control} render={({ field }) => <TextArea label='Описание компании' rows={5} placeholder='Свадебные прически' {...field} />} />
        <Controller name='address' control={control} render={({ field }) => <Input isRequired label='Адрес' placeholder='Адрес компании' {...field} />} />
        <Controller name='phone' control={control} render={({ field }) => <Input label='Телефон' placeholder='Название компании' {...field} />} />
        <Controller
          name='telegram'
          control={control}
          render={({ field }) => (
            <InputGroup label='Телеграм' leadingAddon={<InputGroup.Prefix>https://t.me/</InputGroup.Prefix>}>
              <InputBase {...field} placeholder='никнейм' tooltip='Никнейм указан в профиле телеграм' />
            </InputGroup>
          )}
        />
        <Controller
          name='instagram'
          control={control}
          render={({ field }) => (
            <InputGroup label='Инстаграм' leadingAddon={<InputGroup.Prefix>https://instagram.com/</InputGroup.Prefix>}>
              <InputBase {...field} placeholder='никнейм без @' />
            </InputGroup>
          )}
        />
        <Controller
          name='vkontakte'
          control={control}
          render={({ field }) => (
            <InputGroup label='Вконтакте' leadingAddon={<InputGroup.Prefix>https://vk.com/</InputGroup.Prefix>}>
              <InputBase {...field} placeholder='никнейм либо id12312421' />
            </InputGroup>
          )}
        />
        <Button isLoading={isPending} showTextWhileLoading color='primary' size='lg' className='mt-6 max-w-2xs' type='submit' disabled={isPending}>
          Создать компанию
        </Button>
      </form>
    </div>
  );
}
