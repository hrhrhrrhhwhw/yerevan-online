'use client';

import { useEffect, useState } from 'react';
import { getAvailableSlots } from '../action/get-available-slots';
import { Button } from '@/components/base/buttons/button';

type TimeSlotsProps = {
  staffId: string;
  serviceId: string;
  duration: number;
  date: Date;
  value: string;
  onDateChangeAction: (value: string) => void;
};

export default function TimeSlots({ staffId, serviceId, duration, date, value, onDateChangeAction }: TimeSlotsProps) {
  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!staffId || !serviceId || !date || !duration) return;

    async function loadSlots() {
      const result = await getAvailableSlots({
        staffId,
        serviceId,
        duration,
        date,
      });

      setSlots(result);
    }

    loadSlots();
  }, [staffId, serviceId, date, duration]);

  return (
    <div className='flex flex-wrap gap-2'>
      {slots.map((slot) => (
        <Button
          key={slot}
          type='button'
          onClick={() => onDateChangeAction(slot)}
          color={value === slot ? 'primary' : 'secondary'}
          size='sm'
        >
          {slot}
        </Button>
      ))}
    </div>
  );
}
