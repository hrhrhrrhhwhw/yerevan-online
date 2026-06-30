'use client';

import { Avatar } from '@/components/base/avatar/avatar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type StaffSelectProps = {
  staff: {
    id: string;
    name: string;
    occupation?: string | null;
    image?: string | null;
  }[];
  value?: string;
  onChange: (value: string) => void;
};

export default function StaffSelect({ staff, value, onChange }: StaffSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Выберите сотрудника' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {staff.map((s) => (
            <SelectItem key={s.id} value={s.id} className='flex items-center gap-2'>
              <div className='flex items-center gap-2'>
                <Avatar size='xs' src={s.image} alt={s.name} />
                <span>{s.name}</span>
                {s.occupation && <span className='text-xs text-muted-foreground'>({s.occupation})</span>}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
