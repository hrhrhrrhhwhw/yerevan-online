import ReviewCardForDashboard from '@/app/features/review/components/review-card-for-dashboard';
import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';

export default async function DashboardReview() {
  const user = await sessionUser();
  const company = await prisma.company.findUnique({
    where: {
      ownerId: user.id,
    },
    include: {
      reviews: {
        select: {
          text: true,
          rating: true,
        },
      },
    },
  });

  return (
    <div className='mx-auto p-6 w-full md:w-3xl'>
      <div className='flex flex-col gap-5 rounded-4xl'>
        {company?.reviews.map((review, index) => (
          <ReviewCardForDashboard key={index} review={review} />
        ))}
      </div>
    </div>
  );
}
