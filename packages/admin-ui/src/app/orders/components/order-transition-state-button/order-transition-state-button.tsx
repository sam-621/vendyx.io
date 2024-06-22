import { type FC } from 'react';

import { Button } from '@ebloc/theme';

import { type CommonOrderFragment, OrderState } from '@/lib/ebloc/codegen/graphql';

import { MarkOrderAsShippedOrderButton } from './mark-order-as-shipped/mark-order-as-shipped-button';

export const OrderTransitionOrderStateButton: FC<Props> = ({ order }) => {
  const orderState = order.state;

  if (orderState === OrderState.Modifying) {
    return (
      <Button disabled type="button">
        Complete order
      </Button>
    );
  }

  if (orderState === OrderState.PaymentAdded) {
    return <Button type="button">Authorize payment</Button>;
  }

  if (orderState === OrderState.PaymentAuthorized) {
    return <MarkOrderAsShippedOrderButton id={order.id} />;
  }

  if (orderState === OrderState.Shipped) {
    return <Button type="button">Complete order</Button>;
  }

  return (
    <Button disabled type="button">
      Complete order
    </Button>
  );
};

type Props = {
  order: CommonOrderFragment;
};
