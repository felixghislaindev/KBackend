import { Controller, Get, Param } from '@nestjs/common';
import { AppService, DeliveryDetails } from './app.service';

@Controller('/comms')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  welcomeToNextDelivery(): string {
    return 'Hello! Welcome to your next delivery service. Please provide your user ID to get the delivery details.';
  }
  @Get('/your-next-delivery/:id')
  getNextDelivery(
    @Param('id') userId: string,
  ): DeliveryDetails | { error: string } {
    const deliveryDetails = this.appService.getNextDelivery(userId);

    if ('error' in deliveryDetails) {
      // Handle the error
      return { error: deliveryDetails.error };
    }

    return deliveryDetails;
  }
}
