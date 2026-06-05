import { Vehicle, FAQItem } from '../types';

export const FLEET_VEHICLES: Vehicle[] = [
  {
    id: 'pickup-ford-f250',
    name: 'Ford F-250 Super Duty 4x4',
    category: 'Pickup Trucks',
    payloadCapacity: '4,100 lbs',
    cargoCapacity: '78.5 cu ft (Bed Volume)',
    dimensions: '8ft Cargo Bed Length',
    rateDaily: 89,
    rateWeekly: 530,
    keyFeatures: ['Towing Package', 'Spray-in Bedliner', '4WD Off-Road Capability', 'Crew Cab (Seating for 5)', 'Trailer Brake Controller'],
    imageUrl: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    recommendedUses: ['Light hauling', 'Site visits', 'Contractor support', 'Towing medium trailer', 'Personal DIY transport'],
    specs: {
      engine: '6.2L V8 Gas Engine',
      transmission: 'TorqShift-G 6-speed Automatic',
      fuelType: 'Regular Unleaded',
      gvwr: '10,000 lbs',
      liftgate: 'None (Tailgate Assist)'
    }
  },
  {
    id: 'van-transit-250',
    name: 'Ford Transit 250 High Roof',
    category: 'Cargo Vans',
    payloadCapacity: '3,700 lbs',
    cargoCapacity: '404.3 cu ft',
    dimensions: '143" L x 54" W x 81" H',
    rateDaily: 99,
    rateWeekly: 580,
    keyFeatures: ['Rear View Camera', 'Full Height Side Cargo Door', 'Tie-Down Rails', 'Bluetooth Connectivity', 'Durable Cargo Flooring'],
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200',
    recommendedUses: ['Courier Deliveries', 'Tradesperson tools', 'Apartment moving', 'Weather-protected transport', 'Local business distribution'],
    specs: {
      engine: '3.5L PFDI V6 Engine',
      transmission: '10-speed SelectShift Automatic',
      fuelType: 'Regular Unleaded',
      gvwr: '9,070 lbs',
      liftgate: 'None (Cargo Swing Doors)'
    }
  },
  {
    id: 'box-intl-16ft',
    name: 'International MV 16ft Box Truck',
    category: 'Box Trucks',
    payloadCapacity: '7,500 lbs',
    cargoCapacity: '960 cu ft',
    dimensions: '16\' L x 96" W x 96" H',
    rateDaily: 139,
    rateWeekly: 830,
    keyFeatures: ['Tuck-Away 2,500 lbs Hydraulic Liftgate', 'E-Track Cargo Rails', 'Cab-over Access Attic', 'Translucent Roof (Daylight)', 'Rear Roll-up Door'],
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200',
    recommendedUses: ['Medium business logistics', 'Warehouse deliveries', '3-4 room home moving', 'Heavy equipment hauling', 'Pallet retail transport'],
    specs: {
      engine: 'Cummins B6.7 Turbo Diesel',
      transmission: 'Allison 2200 RDS Automatic',
      fuelType: 'Ultra-Low Sulfur Diesel',
      gvwr: '19,500 lbs (Non-CDL Required)',
      liftgate: '2,500 lbs Max Tuck-away Hydraulic'
    }
  },
  {
    id: 'moving-f650-26ft',
    name: 'Ford F-650 26ft Super Mover',
    category: 'Moving Trucks',
    payloadCapacity: '10,000 lbs',
    cargoCapacity: '1,680 cu ft',
    dimensions: '26\' L x 102" W x 102" H',
    rateDaily: 179,
    rateWeekly: 1050,
    keyFeatures: ['Premium Wide Slide-out Ramp', 'Dual Row E-Track Rails', 'Air-ride Cab seat', 'Hydraulic Brakes', 'Under-body Storage Box'],
    imageUrl: 'https://images.unsplash.com/photo-1516594798947-e6fc50d1e70d?auto=format&fit=crop&q=80&w=1200',
    recommendedUses: ['Large residential moving (5-7 rooms)', 'Bulk commercial furniture', 'Industrial supply transport', 'Event logistics', 'Fleet reinforcement'],
    specs: {
      engine: '6.7L Power Stroke V8 Turbo Diesel',
      transmission: 'Ford TorqShift 6-Speed Automatic',
      fuelType: 'Ultra-Low Sulfur Diesel',
      gvwr: '26,000 lbs (Non-CDL Approved)',
      liftgate: 'Optional (Slide-out ramp standard)'
    }
  },
  {
    id: 'flatbed-ram-5500',
    name: 'Ram 5500 HD Flatbed 12ft',
    category: 'Flatbeds',
    payloadCapacity: '11,500 lbs',
    cargoCapacity: 'Unrestricted height / Open Deck',
    dimensions: '12\' L x 96" W Open Bed',
    rateDaily: 169,
    rateWeekly: 990,
    keyFeatures: ['Heavy Duty Steel Platform', 'Underbody Utility Boxes', 'Gooseneck Hitch capability', 'Stake Pockets & Rub Rails', 'Heavy Load Springs'],
    imageUrl: 'https://images.unsplash.com/photo-1501700494444-f9dd5843a6e5?auto=format&fit=crop&q=80&w=1200',
    recommendedUses: ['Construction materials hauling', 'Scaffolding & steel piping', 'Agriculture & farm transport', 'Equipment delivery', 'Industrial component moving'],
    specs: {
      engine: '6.7L Cummins Turbo Diesel',
      transmission: 'Aisin Heavy-Duty 6-speed Automatic',
      fuelType: 'Ultra-Low Sulfur Diesel',
      gvwr: '19,500 lbs (Non-CDL)',
      liftgate: 'None (Durable Headboard)'
    }
  },
  {
    id: 'stake-silverado-12ft',
    name: 'Silverado 3500HD Stake Bed 12ft',
    category: 'Stake Beds',
    payloadCapacity: '7,800 lbs',
    cargoCapacity: '480 cu ft (with walls)',
    dimensions: '12\' L x 94" W x 40" Side Height',
    rateDaily: 154,
    rateWeekly: 920,
    keyFeatures: ['Removable Red Oak Stake Sides', 'Flat Roll-load Bed Deck', 'Easy Side Forklift Access', 'Heavy Duty D-Rings', 'Integrated Side Steps'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    recommendedUses: ['Nursery & Landscaping materials', 'Voluminous building materials', 'Scrap metal recycling', 'Multi-directional loading cargo', 'Local farm distribution'],
    specs: {
      engine: '6.6L V8 Duramax Diesel',
      transmission: 'Allison 10-speed Automatic',
      fuelType: 'Ultra-Low Sulfur Diesel',
      gvwr: '14,000 lbs (Non-CDL)',
      liftgate: 'None (Removable gate rails)'
    }
  },
  {
    id: 'comm-freightliner-26ft',
    name: 'Freightliner M2 106 Commercial Pro',
    category: 'Commercial Vehicles',
    payloadCapacity: '16,000 lbs',
    cargoCapacity: '1,800 cu ft',
    dimensions: '26\' L x 102" W x 103" H',
    rateDaily: 229,
    rateWeekly: 1390,
    keyFeatures: ['3,500 lbs Maxon Large Hydraulic Tuck-away Liftgate', 'Air Brakes & Pneumatic Suspension', 'Locking Differential', 'Extra-Wide Cargo Door', 'Upgraded Cab Comfort Pack'],
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200',
    recommendedUses: ['Established retail freight distribution', 'Commercial dock-to-dock deliveries', 'Production company equipment', 'Extremely heavy machinery pallet transport', 'Fleet leasing expansions'],
    specs: {
      engine: 'Detroit DD8 7.7L commercial engine',
      transmission: 'Allison 3000 HS Professional Automatic',
      fuelType: 'Ultra-Low Sulfur Diesel',
      gvwr: '33,000 lbs (Class B CDL required)',
      liftgate: '3,500 lbs Tuck-away Hydraulic Liftgate'
    }
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'req-lic',
    category: 'Requirements',
    question: 'What type of driver\'s license is required to rent a commercial truck?',
    answer: 'For almost our entire fleet (Pickup Trucks, Cargo Vans, 16ft Box Trucks, 26ft Moving Trucks, Stake Beds, and Flatbeds), a standard Class C driver\'s license is fully sufficient! No commercial license (CDL) is required. Only our Freightliner M2 106 Cargo Pro which exceeds 26,000 lbs GVWR requires an active Commercial Driver\'s License (Class B CDL).'
  },
  {
    id: 'req-age',
    category: 'Requirements',
    question: 'Is there an age restriction for booking commercial trucks at Bufkin Truck Services?',
    answer: 'Yes, drivers must be at least 21 years of age with a valid U.S. or international driver\'s license and a matching credit card to rent any vehicles from our fleet.'
  },
  {
    id: 'req-dep',
    category: 'Requirements',
    question: 'Are security deposits required upon reservation pickup?',
    answer: 'Yes. We require a security deposit held on your credit card at the time of pickup. For light commercial vehicles (pickups and cargo vans), the deposit is $150. For medium and large trucks (box, moving, flatbed, stake), the deposit is $500. This is fully refunded immediately upon the returns of the undamaged vehicles.'
  },
  {
    id: 'ins-options',
    category: 'Insurance',
    question: 'Do I need commercial insurance to rent a truck?',
    answer: 'We offer flexible Collision Damage Waiver (CDW) options starting from just $19.99/day which relieves you of financial responsibility if the rental truck is damaged. Personal auto insurance often does not cover heavy-duty industrial chassis, so we highly recommend acquiring our CDW or verifying coverage with your credit card provider.'
  },
  {
    id: 'pol-fuel',
    category: 'Policies',
    question: 'What is your company\'s fuel return policy?',
    answer: 'We operate on a "Like-to-Like" fuel policy. The truck is rented to you with a set level of fuel (usually full), and must be returned with the same amount. Refueling charges will apply if returned with a lower level of fuel.'
  },
  {
    id: 'pol-mile',
    category: 'Policies',
    question: 'How are mileage rules calculated for commercial accounts?',
    answer: 'Local reservations include 50 free miles per day. Additional mileage is charged at a flat rate of $0.49/mile. For multi-day, weekly, or national corporate commercial accounts, we offer customizable "unlimited mileage" fleet programs. Speak with one of our service agents to build a tailored plan!'
  },
  {
    id: 'pol-cancel',
    category: 'Policies',
    question: 'What is your reservation cancellation policy?',
    answer: 'Reservations can be modified or cancelled free of charge up to 24 hours prior to the scheduled pickup time. Cancellations made within less than 24 hours will incur a flat $50 late fee.'
  }
];
