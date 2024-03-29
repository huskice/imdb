import NextLink from 'next/link'

import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const roundedToFixed = (input, digits) => {
  const rounded = Math.pow(10, digits)
  return (Math.round(input * rounded) / rounded).toFixed(digits)
}

export const COLUMNS = [
  columnHelper.accessor('action', {
    header: () => 'Action',
    cell: (props) => (
      <NextLink
        onClick={(e) => e.stopPropagation()}
        as="/editMovieTitle"
        href={{ pathname: '/editTitle', query: { title: props.row.original.title, id: props.row.original.id } }}
        style={{ textDecoration: 'underline' }}
      >
        Edit movie title
      </NextLink>
    ),
  }),
  columnHelper.accessor('title', {
    header: () => 'Movie name',
    size: 200,
  }),
  columnHelper.accessor('ratings', {
    header: () => 'Ratings',
    cell: (num) => roundedToFixed(num.getValue(), 1),
    size: 100,
  }),
  columnHelper.accessor('year', {
    header: () => 'Year',
    size: 100,
  }),
  columnHelper.accessor('director', {
    header: () => 'Director',
    size: 140,
  }),
  columnHelper.accessor('starring', {
    header: () => 'Starring',
    size: 140,
  }),
]
