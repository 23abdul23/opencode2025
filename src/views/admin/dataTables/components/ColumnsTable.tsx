"use client";

import {
  Flex,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Link,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { gsap } from "gsap";
import Flip from "gsap/Flip";
import { FaTrophy } from "react-icons/fa";
import Snowfall from "react-snowfall";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import Card from "components/card/Card";
import LeaderboardGraph from "./LeadearboardGraph";
import { NextAvatar } from "components/image/Avatar";

type RowObj = {
  position: number;
  name: string;
  avatarUrl: string;
  githubid: string;
  prmerged: number;
  points: number;
};

const columnHelper = createColumnHelper<RowObj>();
gsap.registerPlugin(Flip);

export default function ColumnTable(props: {
  tableData: RowObj[];
  eventName: string;
}) {
  const { tableData, eventName } = props;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [showProgress, setShowProgress] = React.useState(true);

  const glassBg = useColorModeValue(
    "rgba(255,255,255,0.7)",
    "rgba(15,23,42,0.7)"
  );
  const rowHover = useColorModeValue(
    "rgba(117,81,255,0.08)",
    "rgba(117,81,255,0.15)"
  );

  const columns = [
    columnHelper.accessor("position", {
      header: "RANK",
      cell: (info) => {
        const pos = info.getValue();
        return (
          <Flex align="center" justify="center">
            {pos <= 3 ? (
              <Box
                bg="#FFB547"
                color="white"
                p={{ base: "6px", md: "8px" }}
                borderRadius="full"
                data-trophy
              >
                <FaTrophy size={14} />
              </Box>
            ) : (
              <Text fontWeight="700" fontSize={{ base: "14px", md: "16px" }}>
                {pos}
              </Text>
            )}
          </Flex>
        );
      },
    }),

    columnHelper.accessor("name", {
      header: "NAME",
      cell: (info) => (
        <Text fontWeight="700" fontSize={{ base: "14px", md: "16px" }}>
          {info.getValue()}
        </Text>
      ),
    }),

    columnHelper.accessor("githubid", {
      header: "GITHUB",
      cell: (info) => (
        <Link href={`/user/profile/${info.getValue()}`}>
          <Flex
            align="center"
            gap="10px"
            direction={{ base: "column", sm: "row" }}
          >
            <NextAvatar
              src={info.row.original.avatarUrl}
              h={{ base: "36px", md: "42px" }}
              w={{ base: "36px", md: "42px" }}
            />
            <Text
              fontWeight="700"
              fontSize={{ base: "13px", md: "14px" }}
              textAlign={{ base: "center", sm: "left" }}
            >
              {info.getValue()}
            </Text>
          </Flex>
        </Link>
      ),
    }),

    columnHelper.accessor("prmerged", {
      header: "PR MERGED",
      cell: (info) => (
        <Box
          display={{ base: "none", md: "inline-block" }}
          px="12px"
          py="4px"
          bg="purple.100"
          color="purple.700"
          borderRadius="full"
          fontSize="14px"
          fontWeight="700"
        >
          {info.getValue()}
        </Box>
      ),
    }),

    columnHelper.accessor("points", {
      header: "POINTS",
      cell: (info) => (
        <Flex justify="flex-end" align="center" gap="6px">
          <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="800" color="purple.500">
            {info.getValue()}
          </Text>
          <FaTrophy color="#FFB547" />
        </Flex>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.githubid,
  });

  const tbodyRef = React.useRef<HTMLTableSectionElement | null>(null);
  const prevFlipStateRef = React.useRef<Flip.FlipState | null>(null);

  React.useLayoutEffect(() => {
    if (!showProgress || !tbodyRef.current) return;
    const rows = Array.from(
      tbodyRef.current.querySelectorAll<HTMLTableRowElement>("tr[data-row-id]")
    );
    if (!rows.length) return;

    const newState = Flip.getState(rows);
    if (prevFlipStateRef.current) {
      Flip.from(prevFlipStateRef.current, {
        duration: 0.6,
        ease: "power2.out",
        absolute: true,
        stagger: 0.02,
      });
    }
    prevFlipStateRef.current = newState;
  }, [tableData, sorting, showProgress]);

  return (
    <>
      <Card
        w="100%"
        px={{ base: "16px", md: "24px" }}
        py="20px"
        borderRadius="20px"
        bg={glassBg}
        backdropFilter="blur(18px)"
        boxShadow="0 20px 50px rgba(0,0,0,0.08)"
      >
        <Flex
          justify="space-between"
          align="flex-start"
          mb="20px"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "12px", md: "0" }}
        >
          <Box>
            <Text fontSize={{ base: "24px", md: "32px" }} fontWeight="800">
              Leaderboard
            </Text>
            <Text fontSize="14px" color="gray.500">
              Code. Compete. Conquer
            </Text>
          </Box>

          <Button
            size="sm"
            borderRadius="full"
            onClick={() => setShowProgress(!showProgress)}
          >
            {showProgress ? "Show Graph" : "Show Leaderboard"}
          </Button>
        </Flex>

        {showProgress ? (
          <Box overflowX={{ base: "auto", md: "visible" }}>
            <Table variant="unstyled" minW={{ base: "720px", md: "100%" }}>
              <Thead>
                {table.getHeaderGroups().map((hg) => (
                  <Tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <Th
                        key={header.id}
                        fontSize="11px"
                        textTransform="uppercase"
                        color="gray.400"
                        display={
                          header.column.id === "prmerged"
                            ? { base: "none", md: "table-cell" }
                            : "table-cell"
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>

              <Tbody ref={tbodyRef}>
                {table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    data-row-id={row.id}
                    _hover={{ bg: rowHover }}
                    transition="background 0.2s ease"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Td
                        key={cell.id}
                        py={{ base: "10px", md: "16px" }}
                        display={
                          cell.column.id === "prmerged"
                            ? { base: "none", md: "table-cell" }
                            : "table-cell"
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <LeaderboardGraph
            eventName={decodeURIComponent(eventName)}
            topN={5}
            startDate="2024-12-26"
            endDate="2025-01-25"
          />
        )}
      </Card>

      <Box
        position="fixed"
        inset={0}
        pointerEvents="none"
        zIndex={1}
        display={{ base: "none", md: "block" }}
      >
        <Snowfall snowflakeCount={110} />
      </Box>
    </>
  );
}
