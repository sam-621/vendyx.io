import { type FC } from 'react';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { type CommonListShopFragment, type CommonUserFragment } from '@/api/types';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/lib/shared/components';

import { ShopCard } from './shop-card';
import { ShopsListEmptyState, ShopsListUnauthorizedState } from './shops-list-states';

export const ShopsList: FC<Props> = ({ shops, user }) => {
  if (!user.emailVerified) {
    return <ShopsListUnauthorizedState />;
  }

  if (!shops.length) {
    return <ShopsListEmptyState />;
  }

  return (
    <Card className="max-w-[420px] mx-auto">
      <CardHeader className="flex items-center flex-row justify-between space-y-0">
        <div>
          <CardTitle>Shops</CardTitle>
          <CardDescription>Welcome back </CardDescription>
        </div>
        <Link href="/shops/new">
          <Button size="sm" variant="outline">
            <PlusIcon size={16} className="mr-2" />
            Create Shop
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-0 flex flex-col">
        {shops.map(shop => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </CardContent>
    </Card>
  );
};

type Props = {
  shops: CommonListShopFragment[];
  user: CommonUserFragment;
};
