import BookingModal from '@/app/features/booking/components/booking-modal';
import CompanyCard from '@/app/features/company/components/company-card';
import { CompanyTabs } from '@/app/features/company/components/company-tabs';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;

  const company = await prisma.company.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      owner: {
        select: {
          name: true,
          image: true,
          lastName: true,
        },
      },

      staff: {
        select: {
          id: true,
          name: true,
          occupation: true,
          image: true,
          startTime: true,
          endTime: true,
        },
      },
      services: {
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          duration: true,
        },
      },
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              lastName: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!company) {
    return <div>Нет компании</div>;
  }

  return (
    <div className='mx-auto p-6 max-w-3xl md:w-3xl'>
      <CompanyCard company={company} />
      <div className='mb-5 w-full'>
        <BookingModal company={company} />
      </div>
      <CompanyTabs companyId={company.id} staff={company.staff} services={company.services} reviews={company.reviews} />
    </div>
  );
}
