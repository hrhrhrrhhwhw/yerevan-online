'use client';
import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';
import { InputNumber } from '@/components/base/input/input-number';
import { Label } from '@/components/base/input/label';
import { Prisma } from '@/generated/prisma/client';
import { ServiceFormValues, serviceSchema } from '@/schemas/service.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createService } from '../action/create-service';

type ServiceCreateFormProps = {
  staff: Prisma.StaffGetPayload<{
    select: {
      id: true;
      name: true;
    };
  }>[];
};

export default function ServiceCreateForm({ staff }: ServiceCreateFormProps) {
  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      duration: 50,
      staffIds: [],
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);

  const toggleStaff = (id: string) => {
    setSelectedStaff((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];

      setValue('staffIds', next);

      return next;
    });
  };

  const onSubmit: SubmitHandler<ServiceFormValues> = (data) => {
    startTransition(async () => {
      try {
        const res = await createService(data);

        if (!res.success) {
          console.log(res.error);
        }

        router.refresh();
        router.push('/dashboard/services');
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
        <Controller name='title' control={control} render={({ field }) => <Input isRequired label='Наименование услуги' placeholder='Вечерняя прическа' {...field} />} />
        <Controller name='description' control={control} render={({ field }) => <Input label='Описание услуги' placeholder='Укладка волнистых локонов' {...field} />} />
        <Controller name='price' control={control} render={({ field }) => <InputNumber isRequired label='Стоимость услуги' placeholder='8000' {...field} />} />
        <Controller name='duration' control={control} render={({ field }) => <InputNumber isRequired label='Время оказания услуги в минутах' placeholder='Вечерняя прическа' {...field} />} />
        {staff.map((s) => {
          return (
            <div key={s.id} className='flex items-center gap-2'>
              <Checkbox isSelected={selectedStaff.includes(s.id)} onChange={() => toggleStaff(s.id)} />
              <Label>{s.name}</Label>
            </div>
          );
        })}
        <Button isLoading={isPending} showTextWhileLoading color='primary' size='lg' className='mt-6 max-w-2xs' type='submit' disabled={isPending}>
          Создать услугу
        </Button>
      </form>
    </div>
  );
}
