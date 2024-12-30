'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '../ui/button';
import { useMemo, useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useUpdatePermissionMutation } from '@/api/hooks/usePermissions';
import { usePermissions } from '@/contexts/PermissionsContext';
import { useToast } from '@/hooks/use-toast';

interface Setting {
  id: string;
  type: string;
  role: string;
  action: string;
  display_text: string;
}

interface SettingsProps {
  type: string;
}

function PermissionSection({ type }: SettingsProps) {
  const { settings, setSettings, setUpdatedPermissions } = useSettings();
  const permissions = settings.permissions;

  const settingsNames = useMemo(() => {
    return permissions[type] ? Object.keys(permissions[type]) : [];
  }, [permissions]);

  const onChangeCheckbox = (
    type: string,
    action: string,
    permission: any,
    checked: string | boolean
  ) => {
    const updatedPermission = { ...permission, is_active: checked };
    const prevPermissions = [...permissions[type][action]];
    const updatedPermissions = prevPermissions.map((prevPermission) =>
      prevPermission.id === permission.id ? updatedPermission : prevPermission
    );

    setUpdatedPermissions((prev) => [...prev, updatedPermission]);

    setSettings({
      types: [...settings.types],
      permissions: {
        ...permissions,
        [type]: {
          ...permissions[type],
          [action]: updatedPermissions,
        },
      },
    });
  };

  return (
    <div className='border'>
      <h2 className='px-2 py-2 bg-primary font-semibold'>{type.toUpperCase()}</h2>
      {settingsNames.length > 0 &&
        settingsNames.map((action, index) => (
          <section key={index} className='flex row-col justify-between px-2 py-2'>
            <div className='text-sm sm:text-base'>
              {permissions[type][action].length &&
                permissions[type][action][0]['display_text']}
            </div>
            <div className='flex row-col justify-around gap-3 py-2 min-w-[240px]'>
              {permissions[type][action].length &&
                permissions[type][action].map((permission, index) => (
                  <Checkbox
                    key={permission.id}
                    className='transition-all'
                    checked={permission.is_active}
                    onCheckedChange={(checked) =>
                      onChangeCheckbox(type, action, permission, checked)
                    }
                  />
                ))}
            </div>
          </section>
        ))}
    </div>
  );
}

export default function SettingsGroups() {
  const { settings, updatedPermissions } = useSettings();
  const { refetchPermissions, isLoading } = usePermissions();
  const { toast } = useToast();
  const { mutate: updatePermissions } = useUpdatePermissionMutation({
    onSuccess: () => {
      refetchPermissions();
      toast({
        title: 'Permissions update',
        description: 'The permissions were updated sucessfully',
      });
    },
  });

  const changePermissions = () => {
    if (updatedPermissions.length) {
      updatePermissions(updatedPermissions);
    }
  };

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

        {settings &&
          settings.types?.length &&
          settings.types.map((type: string, index: number) => (
            <PermissionSection key={index} type={type} />
          ))}
        <section className='flex justify-end py-4'>
          <Button disabled={isLoading} onClick={changePermissions}>
            Save
          </Button>
        </section>
      </TabsContent>
    </Tabs>
  );
}
