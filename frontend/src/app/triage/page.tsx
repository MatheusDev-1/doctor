'use client';

import Card, { CardProps } from '@/components/Triage/Card';
import { DataTable } from '@/components/Triage/DataTable';
import { columns } from '@/components/Triage/DataTable/DataTableColumns';
import PageTitle from '@/components/ui/PageTitle';
import { Users } from 'lucide-react';
import TriageCreateUpdateDialog from '@/components/Triage/TriageCreateUpdateDialog';

export type Patient = {
  id: string;
  patient: string;
  age: number;
  status: 'emergency' | 'urgent' | 'less_urgent' | 'routine';
  arrivedAt: string;
};

export default function Triage() {
  const data: Patient[] = [
    {
      id: '728ed52f',
      patient: 'M. H.',
      age: 10,
      status: 'emergency',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '489e1d42',
      patient: 'E. J.',
      age: 25,
      status: 'urgent',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '728ed52f',
      patient: 'M. H.',
      age: 10,
      status: 'emergency',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '489e1d42',
      patient: 'E. J.',
      age: 25,
      status: 'urgent',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '728ed52f',
      patient: 'M. H.',
      age: 10,
      status: 'emergency',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '489e1d42',
      patient: 'E. J.',
      age: 25,
      status: 'urgent',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '728ed52f',
      patient: 'M. H.',
      age: 10,
      status: 'emergency',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '489e1d42',
      patient: 'E. J.',
      age: 25,
      status: 'urgent',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '728ed52f',
      patient: 'M. H.',
      age: 10,
      status: 'emergency',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '489e1d42',
      patient: 'E. J.',
      age: 25,
      status: 'urgent',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '728ed52f',
      patient: 'M. H.',
      age: 10,
      status: 'emergency',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '489e1d42',
      patient: 'E. J.',
      age: 25,
      status: 'urgent',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '728ed52f',
      patient: 'M. H.',
      age: 10,
      status: 'emergency',
      arrivedAt: new Date().toISOString(),
    },
    {
      id: '489e1d42',
      patient: 'E. J.',
      age: 25,
      status: 'urgent',
      arrivedAt: new Date().toISOString(),
    },
  ];

  const cardData: CardProps[] = [
    {
      eta: '15 min.',
      icon: Users,
      status: 'emergency',
      totalPatients: 2,
      loading: false,
    },
    {
      eta: '15 min.',
      icon: Users,
      status: 'urgent',
      totalPatients: 5,
      loading: false,
    },
    {
      eta: '15 min.',
      icon: Users,
      status: 'less_urgent',
      totalPatients: 15,
      loading: false,
    },
    {
      eta: '15 min.',
      icon: Users,
      status: 'routine',
      totalPatients: 35,
      loading: false,
    },
  ];

  return (
    <div className='flex flex-col gap-5 w-full'>
      <PageTitle title='Triage' />
      <section className='flex justify-end'>
        <TriageCreateUpdateDialog />
      </section>
      <section className='grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4'>
        {cardData.map(({ status, eta, icon, loading, totalPatients }, index) => (
          <Card
            key={index}
            eta={eta}
            icon={icon}
            status={status}
            loading={loading}
            totalPatients={totalPatients}
          />
        ))}
      </section>
      <section>
        <DataTable loading={false} columns={columns} data={data} />
      </section>
    </div>
  );
}
