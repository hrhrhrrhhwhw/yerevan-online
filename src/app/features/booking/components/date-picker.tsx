'use client';

import { Calendar } from '@/components/ui/calendar';
import { useMemo } from 'react';

type DatePickerProps = {
  value?: Date;
  onDateChangeAction: (date?: Date) => void;
};

export default function DatePicker({ value, onDateChangeAction }: DatePickerProps) {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const maxDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    return date;
  }, []);

  return <Calendar mode='single' selected={value} onSelect={onDateChangeAction} className='max-w-2xs' startMonth={today} endMonth={maxDate} disabled={(date) => date < today || date > maxDate} />;
}
