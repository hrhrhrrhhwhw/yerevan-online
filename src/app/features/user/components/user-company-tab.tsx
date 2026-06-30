import { Button } from '@/components/base/buttons/button';
import Link from 'next/link';

export default function UserCompanyTabs() {
  return (
    <div className='mt-6'>
      <p className='text-sm font-semibold text-brand-secondary md:text-md mb-6'>Моя компания</p>

      <Link href='/dashboard'>
        <Button>Перейти к компании</Button>
      </Link>
    </div>
  );
}
