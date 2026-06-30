'use client';

import { SocialButton } from '@/components/base/buttons/social-button';
import { authClient } from '@/lib/auth-client';

type GoogleSignInButtonProps = {
  children?: React.ReactNode;
};

export default function GoogleSignInButton({ children = 'Sign in with Google' }: GoogleSignInButtonProps) {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <SocialButton social='google' theme='brand' onClick={signIn}>
      {children}
    </SocialButton>
  );
}
