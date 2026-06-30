'use client';
import { Button } from '@/components/base/buttons/button';
import { useTransition } from 'react';
import { deleteCompanyProfile } from '../action/delete-company';

export default function CompanyDeleteButton() {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteCompanyProfile();
    });
  }
  return (
    <Button size='lg' color='primary-destructive' onClick={handleDelete} isLoading={isPending} showTextWhileLoading>
      Удалить компанию
    </Button>
  );
}
