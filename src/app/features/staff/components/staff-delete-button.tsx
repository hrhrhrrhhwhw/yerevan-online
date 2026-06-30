'use client';

import { useTransition } from 'react';
import { deleteStaff } from '../action/staff-delete';
import { Button } from '@/components/base/buttons/button';
import { useRouter } from 'next/navigation';

interface StaffDeleteButtonProps {
  id: string;
}

export default function StaffDeleteButton({ id }: StaffDeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteStaff({ id });
      if (res.success) {
        router.refresh();
      }
    });
  }
  return (
    <Button size='xs' color='primary-destructive' onClick={handleDelete} isLoading={isPending} showTextWhileLoading>
      Удалить сотрудника
    </Button>
  );
}
