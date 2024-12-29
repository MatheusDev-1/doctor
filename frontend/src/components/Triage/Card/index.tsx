import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Skeleton } from '../../ui/skeleton';

export const formatStatus = (status: string) => {
  return status.replace('_', ' ').toUpperCase();
};

export const statusColorMap = (
  status: 'emergency' | 'urgent' | 'less_urgent' | 'routine'
) => {
  const statusMap = {
    emergency: 'text-teal-600',
    urgent: 'text-teal-500',
    less_urgent: 'text-teal-400',
    routine: 'text-teal-300',
  };

  return statusMap[status];
};

export type CardProps = {
  icon: LucideIcon;
  status: 'emergency' | 'urgent' | 'less_urgent' | 'routine';
  loading: boolean;
  eta: string;
  totalPatients: number;
};

export default function Card(props: CardProps) {
  const { eta, loading, status, totalPatients } = props;

  if (loading) {
    return <Skeleton className='flex w-full flex-col gap-3 h-[120px]' />;
  }

  return (
    <CardContent>
      <section className='flex justify-between gap-2'>
        <p className={`text-sm ${statusColorMap(status)}`}>{formatStatus(status)}</p>
        <props.icon className={`h-4 w-4 ${statusColorMap(status)}`} />
      </section>
      <section>
        <h2 className={`text-2xl font-semibold ${statusColorMap(status)}`}>
          {totalPatients} patients
        </h2>
        <p className='text-xs text-gray-500'>Estimated time: {eta}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'flex w-full flex-col gap-3 rounded-xl border p-5 shadow',
        props.className
      )}
    ></div>
  );
}
