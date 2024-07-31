import { type HTMLInputTypeAttribute, type ReactNode } from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import { Input } from '@ebloc/theme';

import {
  FormControl,
  FormDescription,
  FormField,
  type FormFieldProps,
  FormItem,
  FormLabel,
  FormMessage
} from './form';

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  placeholder,
  type = 'text',
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...rest}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormFieldProps<TFieldValues, TName> & {
  label?: string;
  description?: ReactNode;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};
