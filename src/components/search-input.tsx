'use client';

import { SearchMd } from '@untitledui/icons';
import { Input } from './base/input/input';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Input
      size='lg'
      type='text'
      placeholder='найти компанию'
      icon={SearchMd}
      tooltip='можно искать по названию и по услугам'
      defaultValue={searchParams.get('q') ?? ''}
      onChange={(value) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
          params.set('q', value);
        } else {
          params.delete('q');
        }

        router.replace(`?${params.toString()}`);
      }}
    />
  );
}
