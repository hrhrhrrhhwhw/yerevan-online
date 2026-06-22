import { AvatarProfilePhoto } from './base/avatar/avatar-profile-photo';
import { UserTabs } from './user-tabs';

type User = {
  id: string;
  email: string;
  name: string | null;
  lastName: string | null;
  phone: string | null;
  image?: string | null;
  company?: {
    slug: string;
  } | null;
};

interface UserProps {
  user: User | null;
}

export default function User({ user }: UserProps) {
  return (
    <div>
      <div className='flex gap-6 md:gap-10 items-center'>
        <AvatarProfilePhoto verified size='md' alt={user?.name || ''} src={user?.image} />
        <div>
          <div className='flex gap-2'>
            <h2 className='mt-3 text-display-xs font-semibold text-primary md:text-display-sm'>{user?.name}</h2>
            <h3 className='mt-3 text-display-xs font-semibold text-primary md:text-display-sm'>агаджанян</h3>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <UserTabs />
      </div>
    </div>
  );
}
