import React, { ReactNode } from 'react';
import CookieConsent from '@site/src/components/CookieConsent';

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps): JSX.Element {
  return (
    <>
      {children}
      <CookieConsent />
    </>
  );
}
