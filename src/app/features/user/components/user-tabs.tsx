'use client';
import { useState } from 'react';
import type { Key } from 'react-aria-components';
import { Tabs } from '@/components/application/tabs/tabs';
import { NativeSelect } from '@/components/base/select/select-native';
import UserBookingsTabs from './user-booking-tab';
import UserCompanyTabs from './user-company-tab';
import { UserBooking } from '../../../../../types/user-bookings';



type UserTabsProps = {
  user: {
    bookings: UserBooking[];
  } | null;
};

const tabs = [
  { id: 'bookings', label: 'Мои записи' },
  { id: 'company', label: 'Моя компания' },
];

export const UserTabs = ({ user }: UserTabsProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>('bookings');

  const renderContent = () => {
    switch (selectedTabIndex) {
      case 'bookings':
        return <UserBookingsTabs bookings={user?.bookings ?? []} />;
      case 'company':
        return <UserCompanyTabs />;
      default:
        return null;
    }
  };

  return (
    <>
      <NativeSelect
        size='lg'
        aria-label='Tabs'
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className='md:hidden'
      />
      <Tabs selectedKey={selectedTabIndex} onSelectionChange={setSelectedTabIndex} className='w-max max-md:hidden'>
        <Tabs.List type='button-minimal' items={tabs}>
          {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
      </Tabs>
      <div className='mt-6'>{renderContent()}</div>
    </>
  );
};
