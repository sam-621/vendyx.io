import { getToken } from '../../cookies';
import { type TypedDocumentString } from '../codegen/graphql';

/**
 * A wrapper around the fetch API that makes graphql typed request and manage errors
 */
export const fetcher = async <R, V>(
  query: TypedDocumentString<R, V>,
  variables?: V,
  options?: Options
): Promise<R> => {
  try {
    const result = await fetch(process.env.VENDYX_ADMIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        query: query.toString(),
        variables
      }),
      cache: options?.cache ?? 'no-store',
      next: { tags: options?.tags }
    });

    const { data, errors } = await result.json();

    // TODO: Handle errors - reference: https://github.com/vercel/commerce/blob/d1d9e8c4343e70d72df6e00ec95f6ea4efbb7c54/packages/shopify/src/utils/handle-fetch-response.ts
    if (errors?.length) {
      console.log({
        errors
      });
    }

    return data;
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as R;
  }
};

type Options = {
  tags?: string[];
  cache?: RequestCache;
};
