import { Link } from 'react-router-dom';

import { getFormattedPrice } from '@ebloc/common';
import { Checkbox } from '@ebloc/theme';
import { type ColumnDef } from '@tanstack/react-table';
import { UserIcon } from 'lucide-react';

import { DataTableColumnHeader } from '@/lib/components/data-table';

import { type TableCustomer } from './customer-table';

export const CustomerTableColumns: ColumnDef<TableCustomer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Customer" />;
    },
    cell: ({ row }) => {
      return (
        <Link to={`/customers/${row.original.id}`} className="flex items-center gap-2 w-full">
          <UserIcon size={24} />
          <span>{row.original.name}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: 'orders',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Order" />;
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.orders} {row.original.orders > 1 ? 'orders' : 'order'}
        </span>
      );
    }
  },
  {
    accessorKey: 'totalSpent',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total spent" />;
    },
    cell: ({ row }) => {
      return <span>${getFormattedPrice(row.original.totalSpent)}</span>;
    },
    enableSorting: false
  }
];
