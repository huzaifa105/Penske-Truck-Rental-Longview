export interface Vehicle {
  id: string;
  name: string;
  category: string;
  payloadCapacity: string;
  cargoCapacity: string;
  dimensions: string;
  rateDaily: number;
  rateWeekly: number;
  keyFeatures: string[];
  imageUrl: string;
  recommendedUses: string[];
  specs: {
    engine: string;
    transmission: string;
    fuelType: string;
    gvwr: string;
    liftgate: string;
  };
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  vehicleId: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  totalCost: number;
  days: number;
  hasCdwInsurance: boolean;
  notes?: string;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  pickupZip: string;
  returnZip: string;
  vehicleCategory: string;
  estimatedWeight: string;
  message?: string;
  status: 'Received' | 'Processed';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  category: 'Requirements' | 'Insurance' | 'Policies' | 'Pricing';
  question: string;
  answer: string;
}
