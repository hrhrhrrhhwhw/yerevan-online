'use client';
import { BarChartSquare02, Folder, HomeLine, LayoutAlt01, MessageChatCircle, PieChart03, Settings01 } from '@untitledui/icons';
import type { NavItemDividerType, NavItemType } from '@/components/application/app-navigation/config';
import { SidebarNavigationSectionDividers } from '@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { Prisma } from '@/generated/prisma/client';

type DashboardProps = {
  company: Prisma.CompanyGetPayload<{
    select: {
      slug: true;
    };
  }>;
};

const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
  {
    label: 'На сайт',
    href: `/{$company.slug}`,
    icon: HomeLine,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChartSquare02,
  },
  { divider: true },
  {
    label: 'Компания',
    icon: Folder,
    href: '/dashboard/company',
    items: [
      { label: 'Компания', href: '/dashboard/company' },
      { label: 'Редактировать компанию', href: '/dashboard/company/edit' },
      { label: 'Удалить компанию', href: '/dashboard/company/delete' },
    ],
  },
  {
    label: 'Сотрудники',
    icon: Folder,
    href: '/dashboard/staff',
    items: [
      { label: 'Сотрудники', href: '/dashboard/staff' },
      { label: 'Добавить сотрудника', href: '/dashboard/staff/create' },
      { label: 'Редактировать сотрудников', href: '/dashboard/staff/edit' },
      { label: 'Удалить сотрудников', href: '/dashboard/staff/delete' },
    ],
  },
  {
    label: 'Услуги',
    icon: Folder,
    href: '/dashboard/services',
    items: [
      { label: 'Услуги', href: '/dashboard/services' },
      { label: 'Добавить услугу', href: '/dashboard/services/create' },
      { label: 'Редактировать услуги', href: '/dashboard/services/edit' },
    ],
  },
  { divider: true },
  {
    label: 'Отзывы',
    href: '/dashboard/review',
    icon: PieChart03,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings01,
  },
  {
    label: 'Support',
    href: '/dashboard/support',
    icon: MessageChatCircle,
    badge: (
      <BadgeWithDot color='success' type='modern' size='sm'>
        Online
      </BadgeWithDot>
    ),
  },
  {
    label: 'Open in browser',
    href: 'https://www.untitledui.com/',
    icon: LayoutAlt01,
  },
];

export const Dashboard = () => <SidebarNavigationSectionDividers activeUrl='/' items={navItemsWithDividers} />;
