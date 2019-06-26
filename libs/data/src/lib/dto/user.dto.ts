import { Identifiable } from '../base/identifiable.dto';

export class UserDto extends Identifiable {
  name: string;
  password: string;
  email: string;
  age: number;
  gender: string;
  country: string;
  city: string;
  currency: string;
  personOfFamily: number;
  earns: number;
  budget: number;
  publishBudget: number;
  eat: string[];
  noEat: string[];
  clothes: number;
  householdChemicals: number;
  animals: number;
}
