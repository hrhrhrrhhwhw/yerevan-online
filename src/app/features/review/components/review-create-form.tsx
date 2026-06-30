'use client';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { RatingBadge } from '@/components/foundations/rating-badge';
import { ReviewFormValues, reviewSchema } from '@/schemas/review.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createReview } from '../action/review-create';

type ReviewCreateFormProps = {
  companyId: string;
};

export default function ReviewCreateForm({ companyId }: ReviewCreateFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: '',
      rating: 5,
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ReviewFormValues> = (data) => {
    startTransition(async () => {
      console.log('FORM DATA:', data);
      try {
        const res = await createReview({
          ...data,
          companyId,
        });

        if (!res.success) {
          console.log(res.error);
        }

        router.refresh();
        router.push('');
      } catch (e) {
        console.log(errors);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
        <Controller name='text' control={control} render={({ field }) => <Input isRequired label='Комментарий' placeholder='...' {...field} />} />
        <Controller name='rating' control={control} render={({ field }) => <RatingBadge rating={field.value} onChange={field.onChange} />} />
        <Button isLoading={isPending} showTextWhileLoading color='primary' size='lg' className='mt-6 max-w-2xs' type='submit' disabled={isPending}>
          Send
        </Button>
      </form>
    </div>
  );
}
