'use client';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';

export default function DiscordBanner() {
  return (
    <Link href="https://discord.gg/SxBATvUPnC" target="_blank">
      <Flex
        bg="#5865F2"
        direction="row"
        justify="space-between"
        align="center"
        borderRadius="20px"
        p={{ base: '16px', md: '24px' }}
        mb="24px"
        boxShadow="lg"
        transition="all 0.3s ease"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'xl',
          bg: '#4752C4',
        }}
        gap={{ base: '12px', md: '0px' }}
      >
        <Flex align="center" gap={{ base: '12px', md: '16px' }}>
          <Box
            bg="whiteAlpha.200"
            p={{ base: '10px', md: '12px' }}
            borderRadius="14px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="inner"
            minW={{ base: '48px', md: '56px' }}
          >
            <Icon
              as={FaDiscord}
              w={{ base: '24px', md: '32px' }}
              h={{ base: '24px', md: '32px' }}
              color="white"
            />
          </Box>
          <Box color="white">
            <Text
              fontSize={{ base: '16px', md: '22px' }}
              fontWeight="800"
              lineHeight="1.2"
            >
              Join Community
            </Text>
            <Text
              fontSize={{ base: '11px', md: '14px' }}
              opacity={0.9}
              mt="2px"
              display={{ base: 'none', sm: 'block' }}
            >
              Connect with mentors & contributors
            </Text>
            <Text
              fontSize="10px"
              opacity={0.9}
              mt="2px"
              display={{ base: 'block', sm: 'none' }}
            >
              Connect on Discord
            </Text>
          </Box>
        </Flex>

        <Box
          bg="white"
          color="#5865F2"
          px={{ base: '16px', md: '24px' }}
          py={{ base: '8px', md: '10px' }}
          borderRadius="full"
          fontWeight="700"
          fontSize={{ base: '12px', md: '14px' }}
          boxShadow="sm"
          whiteSpace="nowrap"
          minW="fit-content"
          transition="transform 0.2s"
          _hover={{ transform: 'scale(1.05)' }}
        >
          Join Server
        </Box>
      </Flex>
    </Link>
  );
}
