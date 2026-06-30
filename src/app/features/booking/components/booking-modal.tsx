'use client';
import { Prisma } from '@/generated/prisma/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Button } from '@/components/base/buttons/button';
import StaffSelect from './staff-select';
import ServiceSelect from './service-select';
import DatePicker from './date-picker';
import TimeSlots from './time-slots';
import { Input } from '@/components/base/input/input';
import { createBooking } from '../action/create-booking';

type BookingSheetProps = {
  company: Prisma.CompanyGetPayload<{
    include: {
      category: true;
      staff: {
        select: {
          id: true;
          name: true;
          occupation: true;
          image: true;
          startTime: true;
          endTime: true;
        };
      };
      services: {
        select: {
          id: true;
          title: true;
          description: true;
          price: true;
          duration: true;
        };
      };
      reviews: {
        include: {
          user: {
            select: {
              name: true;
              lastName: true;
              image: true;
            };
          };
        };
      };
    };
  }>;
};

interface BookingResult {
  name: string;
  startAt: Date;
}

export default function BookingModal({ company }: BookingSheetProps) {
  const [step, setStep] = useState(1);
  const [staffId, setStaffId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [booking, setBooking] = useState<BookingResult | null>(null);
  const [isCreated, setIsCreated] = useState(false);

  const selectedService = company.services.find((service) => service.id === serviceId);

  useEffect(() => {
    setTime('');
  }, [staffId, serviceId, date]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='lg' color='primary' className='w-full'>
          Записаться
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm md:max-w-3xl overflow-hidden'>
        <DialogHeader>
          <DialogTitle>{company.name}</DialogTitle>
          <DialogDescription>{company.address}</DialogDescription>
        </DialogHeader>
        <div className='overflow-y-auto max-h-[70vh] scrollbar-hide'>
          <div className='mb-4'>{step > 1 && step < 4 && <Button onClick={() => setStep(step - 1)}>Назад</Button>}</div>
          {step === 1 && (
            <div className='flex flex-col gap-5'>
              <StaffSelect staff={company.staff} value={staffId} onChange={setStaffId} />

              <ServiceSelect services={company.services} value={serviceId} onChange={setServiceId} />

              <Button disabled={!staffId || !serviceId} onClick={() => setStep(2)}>
                Далее
              </Button>
            </div>
          )}
          {step === 2 && (
            <div className='flex flex-col gap-5'>
              <DatePicker value={date} onDateChangeAction={setDate} />

              {date && <TimeSlots staffId={staffId} serviceId={serviceId} duration={selectedService?.duration ?? 0} date={date} value={time} onDateChangeAction={setTime} />}

              <Button disabled={!date || !time} onClick={() => setStep(3)}>
                Далее
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className='flex flex-col gap-5'>
              <Input label='Имя' value={name} onChange={setName} />

              <Input label='Телефон' value={phone} onChange={setPhone} />

              <Button
                disabled={!name || !phone}
                onClick={async () => {
                  const startAt = new Date(date!);

                  const [hours, minutes] = time.split(':').map(Number);

                  startAt.setHours(hours, minutes, 0, 0);

                  const endAt = new Date(startAt);

                  endAt.setMinutes(endAt.getMinutes() + (selectedService?.duration ?? 0));

                  const result = await createBooking({
                    name,
                    phone,
                    staffId,
                    serviceId,
                    startAt,
                    endAt,
                  });

                  if (!result.success) {
                    console.log(result.error);
                    return;
                  }

                  setStep(4);
                  setBooking(result.booking ?? null);
                  setIsCreated(true);
                }}
              >
                Записаться
              </Button>
            </div>
          )}
          {step === 4 && booking && (
            <div className='flex flex-col items-start gap-2'>
              <h2 className='mt-3 text-display-sm font-semibold text-primary'>Вы успешно записаны</h2>
              <span className='text-xl font-semibold text-brand-secondary'>
                {booking.startAt.toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
