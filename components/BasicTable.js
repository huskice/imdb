import { useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'

import { rankItem } from '@tanstack/match-sorter-utils'

import { useQuery } from '@tanstack/react-query'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Button,
  Stack,
  Center,
  Box,
  Text,
  CircularProgress,
} from '@chakra-ui/react'

import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

import { COLUMNS } from './Columns'
import { getMovies } from '../ssp/getMovies'

import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank,
  })

  return itemRank.passed
}

const BasicTable = () => {
  const [globalFilter, setGlobalFilter] = useState('')

  const [sorting, setSorting] = useState([])

  const { isLoading, data: movies, isError, error } = useQuery(['movies'], getMovies)

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => movies, [movies])

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
  })

  const router = useRouter()

  if (isLoading) {
    return <CircularProgress isIndeterminate marginTop="50vh" justifyContent="center" display="flex" />
  }

  if (isError) {
    return (
      <Text align="center" marginTop="50vh">
        {error.message}
      </Text>
    )
  }

  const handleNewMovie = () => {
    router.push('/newMovie')
  }

  return (
    <Center>
      <Box marginLeft="auto" marginRight="auto">
        <Text fontSize="2.5rem" mt="3rem" fontWeight="500">
          MovieDB
        </Text>
        <HStack my="1.5rem" direction="row">
          <GlobalFilter callback={(globalFilter) => setGlobalFilter(globalFilter)} />
          <Button color="white" bg="blue.500" onClick={handleNewMovie} width="8rem">
            + Add Movie
          </Button>
        </HStack>

        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    border="0.13rem solid #C9DCEB"
                    fontWeight="900"
                    color="blackAlpha.900"
                    fontSize="0.8rem"
                    textTransform="capitalization"
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <HStack>
                        {{
                          asc: <ChevronUpIcon boxSize={6} />,
                          desc: <ChevronDownIcon boxSize={6} />,
                        }[header.column.getIsSorted()] || null}
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </HStack>
                    </div>
                    {header.column.getCanFilter() ? (
                      <div style={{ marginTop: '10px' }}>
                        <ColumnFilter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <Td
                    key={cell.id}
                    border="0.12rem solid #C9DCEB"
                    fontSize="0.8rem"
                    color="blackAlpha.900"
                    fontWeight="500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Stack mt="1.3rem" mb="2.6rem" spacing={2} direction="row" justify="right">
          <Button
            leftIcon={<ChevronLeftIcon boxSize={6} />}
            textColor="blue.500"
            border="0.17rem solid #C9DCEB"
            colorScheme="white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <Button
            rightIcon={<ChevronRightIcon boxSize={6} />}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            textColor="blue.500"
            border="0.17rem solid #C9DCEB"
            colorScheme="white"
          >
            Next
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}

export default BasicTable
