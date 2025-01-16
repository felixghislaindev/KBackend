import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

// Define the Cat type
interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'; // Restrict pouchSize to specific values
}

// Define the User type
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

// Define the DeliveryDetails type for the response
export interface DeliveryDetails {
  title: string;
  message: string;
  totalPrice: string;
  freeGift: boolean;
}

@Injectable()
export class AppService {
  // Define pouch prices with explicit keys
  private readonly pouchPrices: { [key in Cat['pouchSize']]: number } = {
    A: 55.5,
    B: 59.5,
    C: 62.75,
    D: 66.0,
    E: 69.0,
    F: 71.25,
  };

  // Load data from the JSON file
  private loadUserData(): User[] {
    const filePath = path.join(__dirname, '..', 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  // Calculate delivery details for a specific user
  getNextDelivery(userId: string): DeliveryDetails | { error: string } {
    const users = this.loadUserData();

    // Find user by ID
    const user = users.find((user) => user.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Filter active subscriptions and calculate total price
    const activeCats = user.cats.filter((cat) => cat.subscriptionActive);
    const totalPrice = activeCats.reduce(
      (sum, cat) => sum + this.pouchPrices[cat.pouchSize],
      0,
    );

    // Format cat names
    const catNames = activeCats.map((cat) => cat.name);
    const formattedCatNames =
      catNames.length > 1
        ? `${catNames.slice(0, -1).join(', ')} and ${catNames[catNames.length - 1]}`
        : catNames[0] || 'your cat';

    // return delivery details following given format
    return {
      title: `Your next delivery for ${formattedCatNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatNames}'s fresh food.`,
      totalPrice: `${totalPrice.toFixed(2)} GBP`,
      freeGift: totalPrice > 120,
    };
  }
}
