'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ServiceSelectProps = {
  services: {
    id: string;
    title: string;
    price: number;
    duration: number;
  }[];

  value?: string;
  onChange: (value: string) => void;
};

export default function ServiceSelect({ services, value, onChange }: ServiceSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Выберите услугу' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {services.map((s) => (
            <SelectItem key={s.id} value={s.id} className='flex items-center gap-2'>
              <div className='flex items-center gap-2'>
                <span>{s.title}</span>
                <span className='text-xs text-muted-foreground'>{s.price} рублей</span>
                <span className='text-xs text-muted-foreground'>{s.duration} минут</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
