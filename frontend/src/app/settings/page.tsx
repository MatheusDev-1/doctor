import SettingsGroups from '@/components/Settings/Settings';
import PageTitle from '@/components/ui/PageTitle';

export default function Settings() {
  return (
    <div className='flex flex-col gap-5 w-full'>
      <PageTitle title='Settings' />
      <section>
        <SettingsGroups />
      </section>
    </div>
  );
}
