import { HStack, Input, Select } from '@chakra-ui/react'

const ColumnFilter = ({ column, table }) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <HStack justify="center">
      <Input
        type="number"
        value={columnFilterValue?.[0] || ''}
        onChange={(e) => column.setFilterValue((old) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        width="4.5rem"
        fontSize="0.9rem"
        border="0.17rem solid #C9DCEB"
      />
      <Input
        type="number"
        value={columnFilterValue?.[1] || ''}
        onChange={(e) => column.setFilterValue((old) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        width="4.5rem"
        fontSize="0.9rem"
        border="0.17rem solid #C9DCEB"
      />
    </HStack>
  ) : (
    <>
      <Select
        type="range"
        width="5.5rem"
        border="0.17rem solid #C9DCEB"
        fontSize="0.9rem"
        onChange={(e) => column.setFilterValue(e.target.value) || undefined}
        value={columnFilterValue || ''}
      >
        <option value="">-</option>
        <option value="0">0-1</option>
        <option value="1">1-2</option>
        <option value="2">2-3</option>
        <option value="3">3-4</option>
        <option value="4">4-5</option>
        <option value="5">5-6</option>
        <option value="6">6-7</option>
        <option value="7">7-8</option>
        <option value="8">8-9</option>
        <option value="9">9-10</option>
        <option value="10">10.0</option>
      </Select>
    </>
  )
}

export default ColumnFilter
