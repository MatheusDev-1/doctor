'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

/* 
    {
        "doctor": {"can_read": false},
        "nurse": [],
        "patient": []
    }


    {
        "permissions": {
            "doctor": [{`
                "id": 1,
                "action": "can_view_triage"
                "display_text": "Can view triage",
                "type": "triage",
                "role": "doctor"
            }]
        }
    }

    /me /profile 
    { 
        "user_role": "doctor",
        "permissions": ["can_view_triage"]
    }
*/

interface Setting {
  id?: string;
  type?: string;
  role?: string;
  action: string;
  display_text?: string;
}

interface SettingsProps {
  type: string;
  settings: Setting[];
  settingsState: Record<string, any>;
  setSettingsState: React.Dispatch<React.SetStateAction<object>>;
}

function PermissionSection({
  type,
  settings,
  settingsState,
  setSettingsState,
}: SettingsProps) {
  const onCheckedToggle = (checked: string | boolean, action: string, role: string) => {
    setSettingsState({
      ...settingsState,
      [role]: {
        ...settingsState[role],
        [action]: checked,
      },
    });
  };

  const [roles] = useState(['admin', 'doctor', 'nurse', 'patient']);

  return (
    <div className='border'>
      {/* <h2 className='px-2 py-2 bg-primary font-semibold'>{type}</h2> */}
      {settings.length > 0 &&
        settings.map(({ action, display_text, type }, index) => (
          <>
            {type && index == 0 ? (
              <h2 className='px-2 py-2 bg-primary font-semibold'>{type}</h2>
            ) : (
              <></>
            )}
            <section key={index} className='flex row-col justify-between px-2 py-2'>
              <div className='text-sm sm:text-base'>{display_text}</div>
              <div className='flex row-col justify-around gap-3 py-2 min-w-[240px]'>
                {roles.map((role, index) => (
                  <Checkbox
                    key={index}
                    className='transition-all'
                    checked={settingsState[role][action]}
                    onCheckedChange={(checked) => onCheckedToggle(checked, action, role)}
                  />
                ))}
              </div>
            </section>
          </>
        ))}
    </div>
  );
}

export default function SettingsGroups() {
  const { settings } = useSettings();

  const [settingsState, setSettingsState] = useState({
    admin: {
      can_view_triage: true,
    },
    doctor: {
      can_view_triage: true,
    },
    nurse: {
      can_view_triage: true,
    },
    patient: {
      can_view_triage: true,
    },
  });

  return (
    <Tabs defaultValue='roles' className='w-full'>
      <TabsList className='w-full gap-3'>
        <TabsTrigger value='roles'>Permissions</TabsTrigger>
      </TabsList>
      <TabsContent value='roles'>
        <header className='flex row-col justify-between px-2 py-2'>
          <div className='text-gray-500'>Actions</div>
          <div className='flex row-col gap-3 min-w-[240px]'>
            <div className='font-semibold'>Admin</div>
            <div className='font-semibold'>Doctor</div>
            <div className='font-semibold'>Nurse</div>
            <div className='font-semibold'>Patient</div>
          </div>
        </header>

        <PermissionSection
          type='Triage'
          settings={settings}
          settingsState={settingsState}
          setSettingsState={setSettingsState}
        />
        {/* <PermissionSection type='Diagnosis' permissions={['View diagnosis', 'Create diagnosis', 'Update diagnosis']} /> */}

        <section className='flex justify-end py-2'>
          <Button>Save</Button>
        </section>
      </TabsContent>
    </Tabs>
  );
}
