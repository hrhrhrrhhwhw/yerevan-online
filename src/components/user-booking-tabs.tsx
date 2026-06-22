import { JobCardSimple, JobCardSimpleProps } from './marketing/careers/base-components/job-card';

export default function UserBookingsTabs() {
  const jobs: JobCardSimpleProps[] = [
    {
      title: 'Свадебная прическа',
      badgeColor: 'blue',
      badgeText: 'Design',
      location: 'Yerevan, Hanrapetutyan, 8',
      type: '12:00',
    },
    {
      title: 'Engineering Manager',
      badgeColor: 'pink',
      badgeText: 'Software Development',
      location: 'Remote',
      type: 'Full-time',
    },
  ];
  return (
    <div className='mt-6'>
      <p className='text-sm font-semibold text-brand-secondary md:text-md mb-6'>Мои записи</p>
      {jobs.map((job) => (
        <li className='list-none' key={job.title}>
          <JobCardSimple {...job} />
        </li>
      ))}
    </div>
  );
}
