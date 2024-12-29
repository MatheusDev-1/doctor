'use client';
import React, { useCallback, useState } from 'react';
import { Nav } from '../ui/nav';
import { ChevronLeft, LogOut, Settings, Users } from 'lucide-react';
import { Button } from '../ui/button';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import Logo from './Logo';
import { usePathname } from 'next/navigation';

type Props = object;

export default function SideNavbar({}: Props) {
  const pathname = usePathname();
  const mobile = useMediaQuery('(max-width: 768px)');
  const [isCollapsed, setIsCollapse] = useState(false);
  const isLoginRoute = pathname === '/login';

  const toggleSideBar = useCallback(() => {
    setIsCollapse(!isCollapsed);
  }, [isCollapsed]);

  if (isLoginRoute) {
    return;
  }

  return (
    <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'>
      {!mobile && (
        <div className='absolute right-[-20px] top-7'>
          <Button
            onClick={toggleSideBar}
            variant='secondary'
            className='rounded-full p-2'
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      <Logo />

      <Nav
        isCollapsed={mobile ? true : isCollapsed}
        links={[
          {
            title: 'Triage',
            icon: Users,
            variant: 'default',
            href: '/triage',
          },
          {
            title: 'Settings',
            icon: Settings,
            variant: 'default',
            href: '/settings',
          },
          {
            title: 'Sign out',
            icon: LogOut,
            variant: 'default',
            href: '/login',
          },
        ]}
      />
    </div>
  );
}
