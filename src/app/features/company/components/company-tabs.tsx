'use client';
import { useState } from 'react';
import type { Key } from 'react-aria-components';
import { Tabs } from '@/components/application/tabs/tabs';
import { NativeSelect } from '@/components/base/select/select-native';
import CompanyServicesTab from './company-services-tab';
import CompanyReviewTab from './company-review-tab';
import CompanyStaffTab from './company-staff-tab';
import { Prisma } from '@/generated/prisma/client';

type CompanyTabsProps = {
  companyId: string;
  staff: Prisma.StaffGetPayload<{
    select: {
      id: true;
      name: true;
      occupation: true;
      image: true;
      startTime: true;
      endTime: true;
    };
  }>[];

  services: Prisma.ServiceGetPayload<{
    select: {
      id: true;
      title: true;
      description: true;
      price: true;
      duration: true;
    };
  }>[];

  reviews: Prisma.ReviewGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          lastName: true;
          image: true;
        };
      };
    };
  }>[];
};

const tabs = [
  { id: 'staff', label: 'Сотрудики' },
  { id: 'services', label: 'Услуги' },
  { id: 'review', label: 'Отзывы' },
];

export const CompanyTabs = ({ companyId, staff, services, reviews }: CompanyTabsProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<Key>('staff');

  const renderContent = () => {
    switch (selectedTabIndex) {
      case 'staff':
        return <CompanyStaffTab staff={staff} />;
      case 'services':
        return <CompanyServicesTab services={services} />;
      case 'review':
        return <CompanyReviewTab companyId={companyId} reviews={reviews} />;
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
