'use client';

import { PropsWithChildren, useState } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { SidebarContext } from 'contexts/SidebarContext';

interface AuthProps extends PropsWithChildren {}

export default function AuthLayout({ children }: AuthProps) {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const pageBg = useColorModeValue(
    'linear-gradient(180deg, #f7f8ff 0%, #eef0ff 100%)',
    'linear-gradient(180deg, #0b1437 0%, #060b28 100%)'
  );

  return (
    <SidebarContext.Provider
      value={{
        toggleSidebar,
        setToggleSidebar,
      }}
    >
      <Box
        minH="100vh"
        w="100%"
        bgGradient={pageBg}
        position="relative"
      >
        {/* Centered content wrapper */}
        <Flex
          minH="100vh"
          align="center"
          justify="center"
          px={{ base: '16px', md: '0px' }}
        >
          <Box
            w="100%"
            maxW="100%"
            transition="all 0.3s ease"
          >
            {children}
          </Box>
        </Flex>
      </Box>
    </SidebarContext.Provider>
  );
}
