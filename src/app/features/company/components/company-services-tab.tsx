import ServiceCard from '../../services/components/service-card';

type CompanyServicesTabProps = {
  services: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    duration: number;
  }[];
};

export default function CompanyServicesTab({ services }: CompanyServicesTabProps) {
  return (
    <div className=''>
      <ServiceCard services={services} />
    </div>
  );
}
