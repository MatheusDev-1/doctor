'use client';

import { Patient } from '@/app/triage/page';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { SquareActivity, Trash } from 'lucide-react';
import Link from 'next/link';
import { formatStatus } from '../Card';
import { format } from 'date-fns';

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'patient',
    header: 'Patient',
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      return <></>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'font-medium w-fit text-white px-4 py-2 rounded-lg bg-teal-400 cursor-default',
            {
              'bg-teal-600': row.getValue('status') === 'emergency',
              'bg-teal-400': row.getValue('status') === 'urgent',
              'bg-teal-300': row.getValue('status') === 'less_urgent',
              'bg-teal-200': row.getValue('status') === 'routine',
            }
          )}
        >
          {formatStatus(row.getValue('status'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'arrivedAt',
    header: 'Arrived at',
    cell: ({ row }) => {
      const arrivedAt = row.getValue('arrivedAt')
        ? format(row.getValue('arrivedAt'), 'yyyy-MM-dd HH:mm')
        : 'N/A';

      return <div>{arrivedAt}</div>;
    },
  },
  {
    accessorKey: 'updateTriage',
    header: 'Edit Triage',
    cell: ({ row }) => {
      return (
        <Link className='text-teal-500' href={`/triage/${row.getValue('id')}`}>
          <SquareActivity />
        </Link>
      );
    },
  },
  {
    accessorKey: 'deleteTriage',
    header: 'Delete Triage',
    cell: ({ row }) => {
      return (
        <Link className='text-teal-500' href={`/triage/${row.getValue('id')}`}>
          <Trash />
        </Link>
      );
    },
  },
];
