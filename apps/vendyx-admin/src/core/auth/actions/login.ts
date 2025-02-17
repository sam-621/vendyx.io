'use server';

import { redirect } from 'next/navigation';

import { UserService } from '@/api/services/user.service';
import { setToken } from '@/shared/cookies/cookies';

export const login = async (email: string, password: string) => {
  const result = await UserService.generateAccessToken({ email, password });

  if (!result.success) {
    return { error: result.error };
  }

  setToken(result.accessToken);

  redirect(`/shops`);
};
