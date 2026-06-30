import StaffCard from '@/app/features/staff/components/staff-card';
import StaffDeleteButton from '@/app/features/staff/components/staff-delete-button';
import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';

export default async function DashboardDeleteStaff() {
  const user = await sessionUser();
  const company = await prisma.company.findUnique({
    where: {
      ownerId: user.id,
    },
    include: {
      staff: {
        select: {
          id: true,
          name: true,
          occupation: true,
          description: true,
          image: true,
          startTime: true,
          endTime: true,
        },
      },
    },
  });

  if (!company) {
    return <div>Нет компании</div>;
  }
  return (
    <div className='mx-auto p-6 w-full md:w-3xl'>
      <div className='grid w-full grid-cols-2 justify-items-center gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4'>
        {company.staff.map((staff) => (
          <div key={staff.id} className='flex flex-col items-center justify-between gap-4'>
            <StaffCard staff={staff} />
            <StaffDeleteButton id={staff.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
