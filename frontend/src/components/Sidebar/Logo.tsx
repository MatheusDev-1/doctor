import React from 'react';
import OrbitingCircles from '@/components/ui/orbiting-circles';
import { Activity, ClipboardPlus, Hospital } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Logo() {
  const mobile = useMediaQuery('(min-width: 768px)');

  return (
    <div className='relative flex sm:h-[100px] sm:w-[65px] md:h-[120px] md:w-[130px] flex-col items-center justify-center overflow-hidden rounded-lg'>
      <span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b text-teal-600 bg-clip-text text-center xm:text-sm md:text-2xl font-semibold leading-none'>
        Doctor
      </span>

      <OrbitingCircles
        className='size-[15px] xm:size-[10px] border-none bg-transparent text-teal-500'
        duration={20}
        delay={10}
        radius={mobile ? 50 : 30}
      >
        <Hospital />
      </OrbitingCircles>

      <OrbitingCircles
        className='size-[15px] xm:size-[10px] border-none bg-transparent text-teal-500'
        duration={20}
        delay={20}
        radius={mobile ? 50 : 30}
      >
        <Activity />
      </OrbitingCircles>

      <OrbitingCircles
        className='size-[15px] md:size-[15px] sm:size-[10px] border-none bg-transparent text-teal-500'
        duration={20}
        radius={mobile ? 30 : 20}
        reverse
      >
        <ClipboardPlus />
      </OrbitingCircles>
    </div>
  );
}
