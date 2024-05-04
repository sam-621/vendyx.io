import { type FC } from 'react';

import { getFormattedPrice } from '@vendyx/common';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@vendyx/theme';

import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { type CommonOrderFragment } from '@/lib/vendyx/codegen/graphql';

export const OrderItemsTable: FC<Props> = ({ order }) => {
  const lines = order.lines.items;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <Table>
            <TableCaption>Desgloce de la orden.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Precio unitario</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map(line => (
                <TableRow key={line.id}>
                  <TableCell>{line.productVariant.sku}</TableCell>
                  <TableCell className="flex items-center gap-2 w-full">
                    <img
                      src={
                        line.productVariant.product.assets.items[0]?.source ?? DEFAULT_PRODUCT_IMAGE
                      }
                      className="h-12 w-12 object-cover rounded-md"
                    />
                    {line.productVariant.product.name}
                  </TableCell>
                  <TableCell>{getFormattedPrice(line.unitPrice)}</TableCell>
                  <TableCell>{line.quantity}</TableCell>
                  <TableCell>{getFormattedPrice(line.linePrice)}</TableCell>
                </TableRow>
              ))}

              <TableRow className="border-transparent">
                <TableCell>Subtotal</TableCell>
                <TableCell>{order.totalQuantity} productos</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{getFormattedPrice(order.subtotal)}</TableCell>
              </TableRow>

              {/* <TableRow className="border-transparent">
                <TableCell>Envío</TableCell>
                <TableCell>Express</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>$ 50.00</TableCell>
              </TableRow> */}

              <TableRow className="border-transparent">
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-semibold">{getFormattedPrice(order.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
