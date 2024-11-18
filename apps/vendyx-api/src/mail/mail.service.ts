import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';
import { ID } from '@/persistance/types';

import { MailClientSendInput, SendGridClient } from './clients';
import { orderConfirmationTemplate } from './templates';

@Injectable()
export class MailService {
  constructor(
    private readonly sendGridClient: SendGridClient,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  async sendOrderConfirmationEmail(orderId: ID): Promise<void> {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: {
        customer: true,
        shipment: true,
        shop: true,
        lines: {
          include: {
            productVariant: {
              include: {
                asset: true,
                variantOptionValues: { include: { optionValue: true } },
                product: { include: { assets: { include: { asset: true } } } }
              }
            }
          }
        }
      }
    });

    const orderInput = {
      ...order,
      lines: order.lines.map(line => ({
        ...line,
        variant: {
          ...line.productVariant,
          optionValues: line.productVariant.variantOptionValues.map(vo => vo.optionValue),
          product: {
            ...line.productVariant.product,
            assets: line.productVariant.product.assets.map(asset => asset.asset)
          }
        }
      }))
    };

    const html = await orderConfirmationTemplate({ order: orderInput, shop: order.shop });

    // TODO: Log? throw?
    if (!order.customer?.email) return;

    const mail: MailClientSendInput = {
      to: order.customer.email,
      from: { email: 'vendyxmail@gmail.com', name: order.shop.name },
      subject: 'We received your order',
      html
    };

    await this.sendGridClient.send(mail);
  }
}
