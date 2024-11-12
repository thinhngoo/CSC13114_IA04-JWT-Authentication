'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCookies } from 'next-client-cookies';

const AuthenticationContext = createContext(
  {} as {
    user?: string;
    token?: string;
    logoutHandler: () => void;
  },
);

export default function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = useCookies();
  const router = useRouter();
  const user = cookieStore.get('user');
  const jwtToken = cookieStore.get('token');
  const pathname = usePathname();

  function logoutHandler() {
    cookieStore.remove('user');
    cookieStore.remove('token');
    router.push('/login');
    toast.success('Logout successful.');
  }

  useEffect(() => {
    if (!user && pathname === '/profile') router.push('/');
  }, [user, router, pathname]);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        token: jwtToken,
        logoutHandler,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthentication = () => useContext(AuthenticationContext);
