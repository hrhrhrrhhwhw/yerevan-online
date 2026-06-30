import StaffEditForm from '@/app/features/staff/components/staff-edit-form';
import { prisma } from '@/lib/prisma';

export default async function DashboardEditStaff() {
  const company = await prisma.company.findFirst({
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
    <div className='mx-auto p-6 w-full'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-y-20 gap-x-5'>
        {company.staff.map((staff) => (
          <StaffEditForm key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
}
