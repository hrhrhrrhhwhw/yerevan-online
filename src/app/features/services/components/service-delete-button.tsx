'use client';

import { ButtonUtility } from '@/components/base/buttons/button-utility';
import { Trash01 } from '@untitledui/icons/Trash01';
import { useTransition } from 'react';
import { deleteService } from '../action/delete-service';

interface Props {
  id: string;
}

export default function ServiceDeleteButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteService({
        id,
      });

      if (!res.success) {
        console.log(res.error);
      }
    });
  }

  return <ButtonUtility size='xs' color='tertiary' tooltip='Delete' icon={Trash01} onClick={handleDelete} isDisabled={isPending} />;
}
