import { Button } from '@/components/base/buttons/button';
import { Dropdown } from '@/components/base/dropdown/dropdown';
import Link from 'next/link';
import { AvatarLabelGroup } from './base/avatar/avatar-label-group';
import { signOutAction } from '@/app/auth';

type User = {
  id: string;
  email: string;
  name: string | null;
  image?: string | null;
  company?: {
    slug: string;
  } | null;
};

type Company = {
  slug: string;
} | null;

interface MenuUserSessionProps {
  user?: User | null;
  company?: Company;
  className?: string;
}

export default function MenuUserSession({ user, company, className }: MenuUserSessionProps) {
  return (
    <Dropdown.Root>
      <Button size='sm' color='link-gray' className='group *:data-icon:size-4 *:data-icon:stroke-[2.25px]!'>
        <AvatarLabelGroup size='lg' src={user?.image || ''} alt={user?.name || 'User'} title={''} subtitle={''} />
      </Button>

      <Dropdown.Popover className='w-54'>
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.Item>
              <Link href={`/user/${user?.id}`}>Профиль</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href={`/user/${user?.id}/edit`}>Редактировать профиль</Link>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item >
              <form action={signOutAction}>
                <Button color='link-gray' className='w-full' type='submit'>
                  Выйти
                </Button>
              </form>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}
