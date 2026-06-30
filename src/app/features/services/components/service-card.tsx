'use client';
import { Table, TableCard } from '@/components/application/table/table';
import { Prisma } from '@/generated/prisma/client';
import ServiceDeleteButton from './service-delete-button';

type ServiceCardProps = {
  services: Prisma.ServiceGetPayload<{
    select: {
      id: true;
      title: true;
      description: true;
      price: true;
      duration: true;
    };
  }>[];
};

export default function ServiceCard({ services }: ServiceCardProps) {
  return (
    <TableCard.Root>
      <TableCard.Header title='Услуги' badge={`количество услуг ${services.length} шт.`} />
      <Table aria-label='Список услуг'>
        <Table.Header>
          <Table.Head id='title' label='Название' isRowHeader className='w-full max-w-1/4' />
          <Table.Head id='description' label='Описание' allowsSorting />
          <Table.Head id='price' label='Цена' allowsSorting tooltip='В рублях' />
          <Table.Head id='duration' label='Длительность' tooltip='Длительность услуги в минутах' />
          <Table.Head id='actions' />
        </Table.Header>
        <Table.Body>
          {services.map((service) => (
            <Table.Row key={service.id}>
              <Table.Cell className='whitespace-nowrap'>{service.title}</Table.Cell>
              <Table.Cell className='whitespace-nowrap md:hidden xl:table-cell'>{service.description}</Table.Cell>
              <Table.Cell className='whitespace-nowrap md:hidden xl:table-cell'>{service.price}</Table.Cell>
              <Table.Cell className='whitespace-nowrap md:hidden xl:table-cell'>{service.duration}</Table.Cell>
              <Table.Cell className='px-4'>
                <div className='flex justify-end gap-0.5'>
                  <ServiceDeleteButton id={service.id} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </TableCard.Root>
  );
}
