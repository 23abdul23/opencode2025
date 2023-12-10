// Chakra imports
import { Flex, Text, Image, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
  // Use useColorModeValue to set logoColor with the gradient
  let logoColor = useColorModeValue('navy.700', 'white');
  return (
    <Flex alignItems="center" flexDirection="column">
      <HorizonLogo h="80px" w="80px" color={logoColor} />

      <Text as="b" fontSize="3xl">
        Geekhaven Events
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
