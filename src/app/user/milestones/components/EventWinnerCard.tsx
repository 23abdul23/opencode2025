'use client';

import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  Progress,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdEmojiEvents, MdStar } from 'react-icons/md';
import { AutoCarousel } from '../../../../components/ui/AutoCarousel';

interface Event {
  eventName: string;
  winners: Record<number, any[]>;
  eventImage?: string;
}

export function EventWinnersCard({ events }: { events: Event[] }) {
  const router = useRouter();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const getRankStyle = (rank: number) => {
    if (rank === 1)
      return {
        bg: 'yellow.50',
        border: 'yellow.200',
        icon: 'yellow.400',
        label: 'Gold',
      };
    if (rank === 2)
      return {
        bg: 'gray.50',
        border: 'gray.200',
        icon: 'gray.400',
        label: 'Silver',
      };
    if (rank === 3)
      return {
        bg: 'orange.50',
        border: 'orange.200',
        icon: 'orange.400',
        label: 'Bronze',
      };
    return {
      bg: 'purple.50',
      border: 'purple.100',
      icon: 'purple.400',
      label: 'Winner',
    };
  };

  return (
    <AutoCarousel>
      {events.map((event, eventIdx) => (
        <Box
          // Key must be unique for the slide itself
          key={`${event.eventName}-${eventIdx}`}
          bg={cardBg}
          p="24px"
          borderRadius="30px"
          boxShadow="2xl"
          border="1px solid"
          borderColor={borderColor}
          h="450px" // Fixed height for consistency in carousel
          display="flex"
          flexDirection="column"
          position="relative"
          overflow="hidden"
        >
          {/* Header */}
          <Flex
            align="center"
            mb="20px"
            pb="16px"
            borderBottom="1px dashed"
            borderColor="gray.200"
          >
            <Flex
              w="40px"
              h="40px"
              bg="purple.100"
              borderRadius="12px"
              align="center"
              justify="center"
              mr="14px"
              flexShrink={0}
            >
              <Icon as={MdEmojiEvents} color="purple.600" w={6} h={6} />
            </Flex>
            <Box overflow="hidden">
              <Text
                fontSize="10px"
                fontWeight="bold"
                color="purple.500"
                textTransform="uppercase"
                letterSpacing="1px"
              >
                Event Champion
              </Text>
              <Text
                fontSize="18px"
                fontWeight="800"
                lineHeight="1.1"
                noOfLines={1}
                title={event.eventName}
              >
                {event.eventName}
              </Text>
            </Box>
          </Flex>

          {/* Scrollable Content */}
          <Box
            flex="1"
            overflowY="auto"
            pr="4px"
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-thumb': {
                background: '#E2E8F0',
                borderRadius: '4px',
              },
            }}
          >
            {Object.entries(event.winners).map(([rank, users]) => {
              const styles = getRankStyle(Number(rank));

              return (
                <Box key={rank} mb="20px">
                  <Flex align="center" mb="10px">
                    <Icon as={MdStar} color={styles.icon} mr="6px" />
                    <Text
                      fontWeight="700"
                      fontSize="13px"
                      color="gray.500"
                      textTransform="uppercase"
                    >
                      {styles.label}
                    </Text>
                  </Flex>

                  {users.map((u, i) => (
                    <Box
                      // FIX: Ensure unique key using ID fallback and index
                      key={u.userId ? `${u.userId}-${i}` : `user-${rank}-${i}`}
                      p="12px"
                      borderRadius="16px"
                      bg={useColorModeValue('white', 'whiteAlpha.50')}
                      border="1px solid"
                      borderColor={useColorModeValue('gray.100', 'gray.600')}
                      boxShadow="sm"
                      mb="10px"
                      cursor="pointer"
                      onClick={() =>
                        u.userId && router.push(`/user/profile/${u.userId}`)
                      }
                      _hover={{
                        borderColor: 'purple.300',
                        transform: 'translateY(-2px)',
                        boxShadow: 'md',
                      }}
                      transition="all 0.2s"
                    >
                      <Flex align="center" mb="8px">
                        <Avatar
                          src={u.avatar}
                          size="sm"
                          mr="12px"
                          ring={2}
                          ringColor={styles.icon}
                        />
                        <Box flex="1" overflow="hidden">
                          <Text fontWeight="700" fontSize="14px" noOfLines={1}>
                            {u.name}
                          </Text>
                          <Text fontSize="11px" color="gray.500" noOfLines={1}>
                            @{u.username}
                          </Text>
                        </Box>
                        {u.score && (
                          <Badge
                            colorScheme="purple"
                            variant="solid"
                            borderRadius="6px"
                            fontSize="10px"
                          >
                            {u.score}
                          </Badge>
                        )}
                      </Flex>

                      {u.score && (
                        <Box mt="6px">
                          <Progress
                            value={Math.min((u.score % 100) + 40, 100)}
                            size="xs"
                            colorScheme={
                              Number(rank) === 1
                                ? 'yellow'
                                : Number(rank) === 2
                                ? 'gray'
                                : 'orange'
                            }
                            borderRadius="full"
                            hasStripe={Number(rank) === 1}
                            isAnimated={Number(rank) === 1}
                          />
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}
    </AutoCarousel>
  );
}
