'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useAuthentication } from '@/providers/Authentication.provider';

export default function ProfilePage() {
  const { user, token } = useAuthentication();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/v1/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProfile(data);
    }
    fetchProfile();
  }, [user]);

  console.log(profile);

  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center items-center size-full">
      <div
        className={clsx(
          'w-80 py-6',
          'flex flex-col justify-center items-center',
          'bg-foreground rounded-md',
        )}
      >
        <h1 className={clsx('font-bold', 'text-2xl md:text-3xl', 'mb-6')}>
          {profile?.username}
        </h1>
        <p
          className={clsx(
            'font-semibold text-on-background/[.6] leading-relaxed',
            'text-lg md:text-2xl',
          )}
        >
          Email: {profile?.email}
        </p>
      </div>
      <Link
        href={'/'}
        className={clsx(
          'px-4 py-2 block mt-10',
          'flex items-center justify-center',
          'font-medium capitalize text-2xl',
          'bg-background text-on-background',
          'border border-on-background',
          'rounded-md focus:outline-none',
          'hover:bg-on-background hover:text-background',
          'transition-colors duration-300',
        )}
      >
        Home
      </Link>
    </div>
  );
}
