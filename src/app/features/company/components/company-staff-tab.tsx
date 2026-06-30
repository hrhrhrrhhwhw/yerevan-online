import { Prisma } from '@/generated/prisma/client';
import StaffCard from '../../staff/components/staff-card';

type CompanyStaffTabProps = {
  staff: {
    id: string;
    name: string;
    occupation: string;
    image: string | null;
    startTime: string
    endTime: string
  }[];
};

export default function CompanyStaffTab({ staff }: CompanyStaffTabProps) {
  return (
    <div className='mt-6'>
      <p className='text-sm font-semibold text-brand-secondary md:text-md mb-6'>Сотрудники</p>

      <div className='grid w-full grid-cols-2 justify-items-center gap-x-4 gap-y-10 md:grid-cols-4 lg:grid-cols-4'>
        {staff.map((s) => (
          <StaffCard key={s.id} staff={s} />
        ))}
      </div>
    </div>
  );
}
