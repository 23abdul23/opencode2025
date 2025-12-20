'use client';

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  Box,
  Flex,
  Icon,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';

import { IoMenuOutline } from 'react-icons/io5';
import { gsap } from 'gsap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import Content from 'components/sidebar/components/Content';
import {
  renderThumb,
  renderTrack,
  renderView,
} from 'components/scrollbar/Scrollbar';

import { IRoute } from 'types/navigation';
import { isWindowAvailable } from 'utils/navigation';

interface SidebarResponsiveProps {
  routes: IRoute[];
}

interface SidebarProps extends SidebarResponsiveProps {
  [x: string]: any;
}

/* -------------------------------------------------------------------------- */
/*                                DESKTOP SIDEBAR                              */
/* -------------------------------------------------------------------------- */

function Sidebar(props: SidebarProps) {
  const { routes } = props;

  const sidebarBg = useColorModeValue(
    'rgba(255,255,255,0.85)',
    'rgba(15,23,42,0.85)'
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const shadow = useColorModeValue(
    '0 20px 40px rgba(0,0,0,0.08)',
    '0 20px 40px rgba(0,0,0,0.4)'
  );

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted || !sidebarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo(
        sidebarRef.current.querySelectorAll('[data-nav-item]'),
        { x: -12, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.06,
          delay: 0.2,
        }
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Box
      display={{ base: 'none', xl: 'block' }}
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      zIndex="100"
    >
      <Box
        ref={sidebarRef}
        w="300px"
        h="100vh"
        bg={sidebarBg}
        backdropFilter="blur(18px)"
        boxShadow={shadow}
        borderRight="1px solid"
        borderColor={borderColor}
      >
        {/* Brand */}
        <Flex
          h="72px"
          align="center"
          px="24px"
          fontWeight="900"
          fontSize="22px"
          letterSpacing="-1px"
        >
          OPENCODE
          <Box ml="8px" w="10px" h="10px" bg="purple.500" borderRadius="full" />
        </Flex>

        <Divider borderColor={borderColor} />

        {/* Nav */}
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Box px="12px" pt="12px">
            <Content routes={routes} />
          </Box>
        </Scrollbars>
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MOBILE SIDEBAR                                */
/* -------------------------------------------------------------------------- */

export function SidebarResponsive(props: SidebarResponsiveProps) {
  const { routes } = props;

  const sidebarBg = useColorModeValue(
    'rgba(255,255,255,0.9)',
    'rgba(15,23,42,0.9)'
  );
  const menuColor = useColorModeValue('gray.600', 'white');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Flex display={{ base: 'flex', xl: 'none' }} align="center">
      {/* Menu Button */}
      <Flex ref={btnRef} onClick={onOpen} cursor="pointer">
        <Icon as={IoMenuOutline} color={menuColor} w="22px" h="22px" />
      </Flex>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={
          isWindowAvailable() &&
          window.document.documentElement.dir === 'rtl'
            ? 'right'
            : 'left'
        }
        finalFocusRef={btnRef}
      >
        <DrawerOverlay backdropFilter="blur(6px)" />
        <DrawerContent
          w="280px"
          maxW="280px"
          bg={sidebarBg}
          backdropFilter="blur(18px)"
        >
          <DrawerCloseButton mt="10px" _focus={{ boxShadow: 'none' }} />

          {/* Brand */}
          <Flex
            h="72px"
            align="center"
            px="24px"
            fontWeight="900"
            fontSize="22px"
            letterSpacing="-1px"
          >
            OPENCODE
            <Box ml="8px" w="10px" h="10px" bg="purple.500" borderRadius="full" />
          </Flex>

          <Divider />

          <DrawerBody px="0" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Box px="12px" pt="12px">
                <Content routes={routes} />
              </Box>
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
