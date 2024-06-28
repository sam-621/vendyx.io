import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateCustomerInput, UpdateCustomerPasswordInput } from '../../common';

import { isErrorResult } from '@/app/service';
import { CustomerService } from '@/app/service/services/customer.service';

@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation('createCustomer')
  async createCustomer(@Args('input') input: CreateCustomerInput) {
    const result = await this.customerService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @Mutation('updateCustomerPassword')
  async updateCustomerPassword(
    @Args('accessToken') accessToken: string,
    @Args('input') input: UpdateCustomerPasswordInput
  ) {
    const result = await this.customerService.updatePassword(accessToken, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @Mutation('generateCustomerAccessToken')
  async generateCustomerAccessToken(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const result = await this.customerService.generateCustomerAccessToken(email, password);

    return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
  }
}
