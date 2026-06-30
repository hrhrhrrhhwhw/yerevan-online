import { Prisma } from '@/generated/prisma/client';
import Image from 'next/image';
import { Clock, MarkerPin02 } from '@untitledui/icons';
import { Tag, TagGroup, TagList } from '@/components/base/tags/tags';
import Link from 'next/link';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { RatingBadge } from '@/components/foundations/rating-badge';

type CompanyCardProps = {
  company: Prisma.CompanyGetPayload<{
    include: {
      category: true;
    };
  }>;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className=''>
      <div className='h-80 overflow-hidden rounded-4xl'>
        <Image src={company.image ?? ''} alt='company' width={200} height={100} className='size-full object-cover' loading='eager' />
      </div>
      <div className='flex flex-col rounded-xs py-6 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-4'>
        <div className='flex flex-col gap-2 md:items-center md:flex-row justify-between'>
          <h2 className='text-display-xs font-semibold text-primary md:text-display-sm'>{company.name}</h2>
          <BadgeWithDot size='lg' color={company.category.color as 'brand'}>
            {company.category.label}
          </BadgeWithDot>
        </div>

        <div>
          {(company.instagram || company.vkontakte || company.telegram || company.phone) && (
            <TagGroup label='Контакты' size='lg' className='mt-5'>
              <TagList className='flex flex-wrap gap-3'>
                {company.instagram && (
                  <Tag avatarSrc='/instagram.svg' textValue={company.instagram}>
                    <Link target='_blank' href={`https://www.instagram.com/${company.instagram}`}>
                      {company.instagram}
                    </Link>
                  </Tag>
                )}

                {company.vkontakte && (
                  <Tag avatarSrc='/vk.svg' textValue={company.vkontakte}>
                    <Link target='_blank' href={`https://www.vk.com/${company.vkontakte}`}>
                      {company.vkontakte}
                    </Link>
                  </Tag>
                )}

                {company.telegram && (
                  <Tag avatarSrc='/telegram.svg' textValue={company.telegram}>
                    <Link target='_blank' href={`https://t.me/${company.telegram}`}>
                      {company.telegram}
                    </Link>
                  </Tag>
                )}

                {company.phone && (
                  <Tag avatarSrc='/phone.svg' textValue={company.phone}>
                    <Link target='_blank' href={`tel:${company.phone}`}>
                      {company.phone}
                    </Link>
                  </Tag>
                )}
              </TagList>
            </TagGroup>
          )}
        </div>

        <div className='mt-5 flex justify-between gap-4 items-center'>
          <div className='flex flex-col md:flex-row gap-4 items center'>
            <div className='flex items-center gap-1.5'>
              <MarkerPin02 size={20} className='text-fg-quaternary' />
              <span className='text-sm font-medium text-tertiary'>{company.address}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Clock size={20} className='text-fg-quaternary' />
              <span className='text-sm font-medium text-tertiary'>{company.workTime}</span>
            </div>
          </div>
          <div>
            <RatingBadge rating={4.5} subtitle='2,000+ reviews' />
          </div>
        </div>
      </div>
    </div>
  );
}
