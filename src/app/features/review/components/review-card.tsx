import { Avatar } from '@/components/base/avatar/avatar';
import { Prisma } from '@/generated/prisma/client';

type ReviewCardProps = {
  review: Prisma.ReviewGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          lastName: true;
          image: true;
        };
      };
    };
  }>;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex gap-4'>
        <Avatar size='xs' alt={review.user.name || ''} src={review.user.image} />
        <p className='flex gap-2'>
          {review.user.name} {review.user.lastName}
        </p>
        <span>{review.rating}</span>
      </div>
      <div className='mt-2'>{review.text}</div>
    </div>
  );
}
