import { Prisma } from '@/generated/prisma/client';
import ReviewCard from '../../review/components/review-card';
import ReviewCreateForm from '../../review/components/review-create-form';

type CompanyReviewTabProps = {
  companyId: string;
  reviews: Prisma.ReviewGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          lastName: true;
          image: true;
        };
      };
    };
  }>[];
};

export default function CompanyReviewTab({ companyId, reviews }: CompanyReviewTabProps) {
  return (
    <div className='flex flex-col gap-4'>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      <ReviewCreateForm companyId={companyId} />
    </div>
  );
}
