import clsx from 'clsx';
import { Brand, ThemeSelection } from '@/components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx('relative', 'w-screen h-screen')}>
      <div className={clsx('absolute top-0 left-0', 'pt-5 pl-4')}>
        <Brand hyperlink />
      </div>
      <ThemeSelection className="absolute top-0 right-0" />
      <main className={clsx('flex items-center justify-center', 'size-full')}>
        {children}
      </main>
    </div>
  );
}
