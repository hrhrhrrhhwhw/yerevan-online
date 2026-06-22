'use client';

import { Button } from '@/components/base/buttons/button';
import { Form } from '@/components/base/form/form';
import { Input } from '@/components/base/input/input';
import { SocialButton } from '../base/buttons/social-button';
import Link from 'next/link';
import { signUpAction } from '@/app/auth';

export default function SignUp() {
  return (
    <section className='bg-primary py-10 md:py-12'>
      <div className='mx-auto max-w-container px-4 md:px-8'>
        <div className='mb-5'>
          <Link href='/'>
            <Button color='link-color'>На главную</Button>
          </Link>
        </div>
        <div className='mx-auto flex w-full max-w-3xl flex-col items-center text-center'>
          <h2 className='mt-3 text-display-md font-semibold text-primary md:text-display-lg'>Создать аккаунт</h2>
          <div className='flex gap-4 items-center mt-4'>
            <p className='text-lg text-tertiary  md:text-xl'>Уже есть аккаунт?</p>
            <Link href='/sign-in'>
              <Button color='link-color'>Войти</Button>
            </Link>
          </div>
        </div>

        <Form
          action={signUpAction}
          className='mx-auto mt-8 flex flex-col gap-8 md:mt-12 md:max-w-120'
        >
          <div className='flex flex-col gap-6'>
            <Input isRequired size='lg' name='name' label='Name' type='text' placeholder='Anahit' />
            <Input isRequired size='lg' name='email' label='Email' type='email' placeholder='you@company.com' />
            <Input isRequired size='lg' name='password' label='Password' type='password' />
          </div>

          <Button type='submit' size='xl'>
            Создать аккаунт
          </Button>

          <div className='flex flex-col gap-3'>
            <p className='mt-4 text-lg text-tertiary md:mt-6 md:text-xl'>Или авторизуйтесь используя</p>
            <SocialButton social='google' theme='brand'>
              Sign in with Google
            </SocialButton>
            <SocialButton social='facebook' theme='brand'>
              Sign in with Facebook
            </SocialButton>
            <SocialButton social='apple' theme='brand'>
              Sign in with Apple
            </SocialButton>
          </div>
        </Form>
      </div>
    </section>
  );
}
