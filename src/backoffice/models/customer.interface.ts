import { Document } from 'mongoose';
import { Address } from './address.model';
import { CreditCard } from './credit-card.model';
import { Pet } from './pet.model';
import { User } from './user.model';

export interface ICustomer extends Document {
  name: string;
  document: string;
  email: string;
  pets: Pet[];
  billingAddress: Address;
  shippingAddress: Address;
  creditCard: CreditCard;
  user: User;
}
