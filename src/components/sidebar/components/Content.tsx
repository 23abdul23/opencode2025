// Chakra imports
import { Box, Flex, Stack, Divider } from '@chakra-ui/react';
// Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
// import SidebarCard from 'components/sidebar/components/SidebarCard';
import { IRoute } from 'types/navigation';

interface SidebarContentProps {
  routes: IRoute[];
}

function SidebarContent(props: SidebarContentProps) {
  const { routes } = props;

  return (
    <Flex
      direction="column"
      h="100%"
      pt="20px"
      pb="20px"
    >
      {/* Brand Section */}
      <Brand />

      {/* Navigation Links */}
      <Stack
        direction="column"
        spacing="6px"
        mt="4px"
        mb="auto"
      >
        <Box
          px="16px"
        >
          <Links routes={routes} />
        </Box>
      </Stack>


      <Box
        px="16px"
        mt="40px"
        mb="20px"
        opacity={0.9}
      >
        {/* 
          Optional future use:
          <SidebarCard />
        */}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
