/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { ReactNode, useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Text,
  Center,
  Space,
  Divider
} from '@mantine/core'

const useStyles = createStyles(theme => ({
  th: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#FAFAFA',
    padding: '18px !important'
  },

  thText: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '#000000d9'
  },
  control: {
    width: '100%',
    minWidth: 0,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },
  ellipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  icon: {
    width: 21,
    height: 21,
    borderRadius: 21
  }
}))

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean | null
  onSort?: () => void
  width?: string | number
  ellipsis?: boolean
  hasSeparator?: boolean
}

type IconType = {
  size: number
  strokeWidth: number
}

function Th({
  children,
  reversed,
  sorted,
  onSort,
  width,
  ellipsis,
  hasSeparator
}: ThProps) {
  const { classes } = useStyles()
  return (
    <th className={classes.th} style={{ width }}>
      <div className="flex justify-between">
        <Text className={classes.thText}> {children}</Text>
        {!hasSeparator && <Divider orientation="vertical" />}
      </div>
    </th>
  )
}

Th.defaultProps = {
  onSort: null,
  width: 'auto',
  ellipsis: false,
  hasSeparator: false
}

export interface TableColumn<C> {
  key: any
  title: string | React.ReactNode
  dataIndex: keyof C
  // eslint-disable-next-line
  render?: (value: C[] | any, record: C, index: number) => React.ReactNode // render cell data; value is the value of the dataindex, record is the whole row data, index is the index of the row
  sorter?: ((a: C, b: C) => number) | boolean // Sort function for local sort, see Array.sort's compareFunction. If you need sort buttons only, set to true
  width?: string | number
  ellipsis?: boolean
}
interface TableProps<T> {
  data: T[]
  onSort?: (key: keyof T, reversed: boolean) => void
  columns: TableColumn<T>[]
  footer?: React.ReactNode
  maxRow?: number
  empty?: ReactNode
}

function CustomTable<T>({
  data,
  onSort,
  columns,
  footer,
  empty,
  maxRow
}: TableProps<T>) {
  const [sortBy, setSortBy] = useState<keyof T | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof T) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    if (onSort) onSort(field, reversed)
  }

  const rows = data?.slice(0, maxRow).map((row, rowIndex) => (
    <tr key={`${Math.random()}row`}>
      {columns.map(column => (
        <td key={column.key} className="text-left" width={column.width}>
          {typeof column.render === 'function' ? (
            <div className="pl-1">
              {column.render(row[column.dataIndex], row, rowIndex)}
            </div>
          ) : (
            <Text className="pl-1">{row[column.dataIndex]?.toString()}</Text>
          )}
        </td>
      ))}
    </tr>
  ))

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="lg"
        verticalSpacing="lg"
        sx={{ tableLayout: 'fixed' }}
      >
        <thead>
          <tr>
            {columns.map((column, index) => (
              <Th
                key={column.key}
                reversed={reverseSortDirection}
                sorted={column.sorter ? sortBy === column.dataIndex : null}
                onSort={() => setSorting(column.dataIndex)}
                width={column.width}
                ellipsis={column.ellipsis}
                hasSeparator={index === columns.length - 1}
              >
                {column.title}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={columns.length}>{empty}</td>
            </tr>
          )}
        </tbody>
      </Table>
      {footer}

      <Space h="md" />
    </ScrollArea>
  )
}

CustomTable.defaultProps = {
  footer: null,
  maxRow: 5,
  onSort: null,
  empty: (
    <Text weight={500} align="center" lineClamp={1} className="py-10">
      There is no data
    </Text>
  )
}

export default CustomTable
