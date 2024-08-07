import { type FC } from 'react';

import { type VariantContext } from '../../contexts';
import { OptionDetailsForm } from './option-details-form';
import { OptionDetailsPreview } from './option-details-preview';

export const OptionDetails: FC<Props> = ({ option }) => {
  if (!option?.isEditing && option) {
    return <OptionDetailsPreview option={option} />;
  }

  return <OptionDetailsForm option={option} />;
};

type Props = {
  option: VariantContext['options'][0];
};
