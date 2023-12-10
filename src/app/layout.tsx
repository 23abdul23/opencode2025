import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import RootHead from './head';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <RootHead/>
      <body id={'root'}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
