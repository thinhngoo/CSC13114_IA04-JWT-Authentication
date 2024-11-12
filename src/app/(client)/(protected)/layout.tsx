import clsx from 'clsx';
import { Brand, ThemeSelection } from '@/components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={clsx('absolute top-0 left-0', 'pt-5 pl-4')}>
        <Brand hyperlink />
      </div>
      <ThemeSelection className="absolute top-0 right-0" />
      <div className="w-screen h-screen overflow-y-auto">{children}</div>
    </>
  );
}
