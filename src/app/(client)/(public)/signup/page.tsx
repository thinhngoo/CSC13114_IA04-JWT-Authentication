'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import clsx from 'clsx';
import { Form, Divider, NavigationText } from '@/components';
import { SIGNUP_FORM } from '@/constants/form';
import type { SignupFormData } from '@/constants/form';

export default function SignupPage() {
  const router = useRouter();

  async function handleSignup(data: SignupFormData) {
    toast.loading('Signing up...');
    await axios
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/v1/signup`, data)
      .then((response) => {
        console.log(response);
        router.push('/');
        toast.dismiss();
        toast.success(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.dismiss();
        toast.error(error.response.data);
      });
  }

  return (
    <div className="max-w-xl lg:max-w-3xl">
      <Link className="block mb-6" href="/">
        <span className="sr-only">Home</span>
        <Image src="/logo.svg" alt="logo" width={80} height={80} />
      </Link>

      <h1 className={clsx('font-bold', 'text-2xl md:text-3xl')}>
        Think it. Make it.
      </h1>

      <p
        className={clsx(
          'font-semibold text-on-background/[.6] leading-relaxed',
          'text-lg md:text-2xl',
        )}
      >
        Create your account
      </p>

      <Form
        formData={SIGNUP_FORM}
        className="w-80"
        submitText="sign up"
        onSubmit={handleSignup}
      />
      <Divider className={clsx('mb-3 mt-5', 'text-xs uppercase')} text="or" />
      <NavigationText
        text="Already have an account?"
        path="/login"
        hyperlink="Log in"
        className={clsx('w-full', 'text-center', 'opacity-80')}
      />
    </div>
  );
}
