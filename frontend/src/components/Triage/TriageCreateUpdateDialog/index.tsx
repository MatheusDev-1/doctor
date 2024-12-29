'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { patientFormSchema } from '@/schemas';
import { z } from 'zod';

type FormData = z.infer<typeof patientFormSchema>;

export default function TriageCreateUpdateDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='default' className='text-white'>
            Add triage
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add triage</DialogTitle>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='default' className='text-white'>
          Add triage
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Add triage</DrawerTitle>
        </DrawerHeader>
        <ProfileForm className='px-4' />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {},
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      className={cn('grid items-start gap-4', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='grid grid-cols-2 gap-2'>
        <section>
          <Label htmlFor='firstName'>First name</Label>
          <Input
            id='firstName'
            {...register('firstName')}
            className={`block w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstName && (
            <p className='text-red-500 text-sm'>{errors.firstName.message}</p>
          )}
        </section>

        <section>
          <Label htmlFor='lastName'>Last name</Label>
          <Input
            id='lastName'
            {...register('lastName')}
            className={`block w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastName && (
            <p className='text-red-500 text-sm'>{errors.lastName.message}</p>
          )}
        </section>
      </div>

      <div className='grid gap-2'>
        <Select
          {...register('gender')}
          onValueChange={(value) => setValue('gender', value)}
        >
          <SelectTrigger
            className={`w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <SelectValue placeholder='Select gender' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='man'>Man</SelectItem>
            <SelectItem value='woman'>Woman</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && <p className='text-red-500 text-sm'>{errors.gender.message}</p>}
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='email'>Social Security Number</Label>
        <Input
          id='ssn'
          placeholder='AAAAA-AA-AAA'
          {...register('ssn')}
          className={`block w-full p-2 border ${errors.ssn ? 'border-red-500' : 'border-gray-300'}`}
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          placeholder='patient@gmail.com'
          {...register('email')}
          className={`block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='birthDate'>Birthdate</Label>
        <Input
          type='date'
          id='birthDate'
          defaultValue=''
          {...register('birthDate')}
          className={`block w-full p-2 border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.birthDate && (
          <p className='text-red-500 text-sm'>{errors.birthDate.message}</p>
        )}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='triage'>Triage</Label>
        <Textarea
          placeholder='Describe how the patient is feeling'
          {...register('triage')}
          className={`h-[100px] mt-1 block w-full p-2 border ${errors.triage ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.triage && <p className='text-red-500 text-sm'>{errors.triage.message}</p>}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='diagnosis'>Diagnosis</Label>
        <Textarea
          placeholder='Describe the patient diagnosis'
          {...register('diagnosis')}
          className={`block w-full p-2 border ${errors.diagnosis ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.diagnosis && (
          <p className='text-red-500 text-sm'>{errors.diagnosis.message}</p>
        )}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='status'>Priority</Label>
        <Select
          defaultValue='routine'
          {...register('status')}
          onValueChange={(value) => setValue('status', value)}
        >
          <SelectTrigger
            className={`w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <SelectValue placeholder='Select status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='emergency'>Emergency</SelectItem>
            <SelectItem value='urgent'>Urgent</SelectItem>
            <SelectItem value='less_urgent'>Less urgent</SelectItem>
            <SelectItem value='routine'>Routine</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}
      </div>
      <Button type='submit'>Save</Button>
    </form>
  );
}
