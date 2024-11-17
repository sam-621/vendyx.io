import { type FC, useEffect, useState } from 'react';

import { type ID } from '@/api/scalars';
import { type CommonCollectionProductFragment } from '@/api/types';
import { DefaultEntitySelectorRow, EntitySelector } from '@/lib/shared/components';
import { notification } from '@/lib/shared/notifications';

import { addCollectionProducts } from '../../actions/add-collection-products';
import { useCollectionProductSelector } from './use-collection-product-selector';

export const CollectionProductSelector: FC<Props> = ({
  collectionId,
  defaultProducts,
  onFinishSelection
}) => {
  const { products, handleSearch, isFetching } = useCollectionProductSelector();

  const [selected, setSelected] = useState<string[]>(defaultProducts.map(p => p.id));

  useEffect(() => {
    setSelected(defaultProducts.map(p => p.id));
  }, [defaultProducts]);

  return (
    <EntitySelector
      title="Add products"
      description="Add products to your zone"
      triggerText="Add products"
      items={products}
      isFetching={isFetching}
      isDoneAPromise
      onDone={async close => {
        await addCollectionProducts(collectionId, selected);
        close();
        onFinishSelection();
        notification.success('Products updated');
      }}
      onSearch={handleSearch}
      renderItem={product => (
        <DefaultEntitySelectorRow
          key={product.id}
          checked={selected.includes(product.id)}
          label={product.name}
          onCheckedChange={() => {
            if (selected.includes(product.id)) {
              setSelected(selected.filter(id => id !== product.id));
            } else {
              setSelected([...selected, product.id]);
            }
          }}
        />
      )}
    />
  );
};

type Props = {
  collectionId: ID;
  defaultProducts: CommonCollectionProductFragment[];
  onFinishSelection: () => void;
};
