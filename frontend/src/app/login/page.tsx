'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'; // Adjust based on your component path
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginSchema } from '@/schemas';
import { useSigninMutation } from '@/api/hooks/useAuth';
import { useRouter } from 'next/navigation';

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const { mutate: signin, isPending } = useSigninMutation({
    onError: () => {
      setError('email', { message: 'Email or password incorrect' });
      setError('password', { message: 'Email or password incorrect' });
    },
    onSuccess: () => {
      router.push('/triage');
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    return signin(data);
  };

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6'>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      disabled={isPending}
                      placeholder='doctor@lilium.com'
                      className={`block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className='text-sm text-red-600'>{errors.email.message}</p>
                    )}
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center'>
                      <Label htmlFor='password'>Password</Label>
                    </div>
                    <Input
                      id='password'
                      disabled={isPending}
                      type='password'
                      className={`block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('password')}
                    />
                    {errors.password && (
                      <p className='text-sm text-red-600'>{errors.password.message}</p>
                    )}
                  </div>
                  <Button disabled={isPending} type='submit' className='w-full'>
                    Login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
