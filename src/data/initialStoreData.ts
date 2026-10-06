import { Order, CorporateQuote } from '@/types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'CM-882941',
    date: '2026-10-06 10:30 AM',
    customerName: 'Tanvir Hasan (তানভীর হাসান)',
    phone: '01712-345678',
    email: 'tanvir.hasan@gmail.com',
    address: 'House 14, Road 5, Block D, Mirpur-10',
    district: 'Dhaka (ঢাকা)',
    area: 'Mirpur-10, Dhaka',
    notes: 'Please call before delivery',
    items: [
      {
        productId: 'cm-prod-001',
        name: 'AMANA Floor Cleaner Lemon Fresh (5 L)',
        size: '5 L',
        price: 650,
        quantity: 2,
        total: 1300,
        image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&auto=format&fit=crop&q=80',
      },
      {
        productId: 'cm-prod-003',
        name: 'SoftTouch Antibacterial Hand Wash (5 L)',
        size: '5 L',
        price: 720,
        quantity: 1,
        total: 720,
        image: 'https://images.unsplash.com/photo-1608248597359-0021c32fa1d7?w=400&auto=format&fit=crop&q=80',
      }
    ],
    subtotal: 2020,
    deliveryFee: 0,
    discount: 0,
    total: 2020,
    paymentMethod: 'cod',
    status: 'shipped',
    timeline: [
      { status: 'placed', title_en: 'Order Placed', title_bn: 'অর্ডার গ্রহণ', time: '10:30 AM', completed: true },
      { status: 'confirmed', title_en: 'Confirmed', title_bn: 'নিশ্চিতকৃত', time: '11:15 AM', completed: true },
      { status: 'processing', title_en: 'Packing & QC', title_bn: 'প্যাকিং সম্পন্ন', time: '02:45 PM', completed: true },
      { status: 'shipped', title_en: 'Shipped', title_bn: 'কুরিয়ারে হস্তান্তর', time: '04:30 PM', completed: true, current: true },
      { status: 'out_for_delivery', title_en: 'Out for Delivery', title_bn: 'ডেলিভারির পথে', time: 'Pending', completed: false },
      { status: 'delivered', title_en: 'Delivered', title_bn: 'ডেলিভারি সম্পন্ন', time: 'Pending', completed: false }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'CM-741982',
    date: '2026-10-06 02:15 PM',
    customerName: 'Rahim Uddin (রহিম উদ্দিন)',
    phone: '01819-876543',
    email: 'rahim.ctg@yahoo.com',
    address: 'Plot 42, GEC Circle, Nasirabad',
    district: 'Chattogram (চট্টগ্রাম)',
    area: 'Nasirabad, Chattogram',
    notes: 'Urgent clinic requirement',
    items: [
      {
        productId: 'cm-prod-010',
        name: 'Carnival Mart Mega Hygiene Bundle (20 Liters)',
        size: '20 Liters (4x 5L)',
        price: 2530,
        quantity: 2,
        total: 5060,
        image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&auto=format&fit=crop&q=80',
      }
    ],
    subtotal: 5060,
    deliveryFee: 0,
    discount: 0,
    total: 5060,
    paymentMethod: 'bkash',
    status: 'processing',
    timeline: [
      { status: 'placed', title_en: 'Order Placed', title_bn: 'অর্ডার গ্রহণ', time: '02:15 PM', completed: true },
      { status: 'confirmed', title_en: 'Confirmed', title_bn: 'নিশ্চিতকৃত', time: '02:40 PM', completed: true },
      { status: 'processing', title_en: 'Packing & QC', title_bn: 'প্যাকিং সম্পন্ন', time: '03:30 PM', completed: true, current: true },
      { status: 'shipped', title_en: 'Shipped', title_bn: 'কুরিয়ারে হস্তান্তর', time: 'Pending', completed: false },
      { status: 'out_for_delivery', title_en: 'Out for Delivery', title_bn: 'ডেলিভারির পথে', time: 'Pending', completed: false },
      { status: 'delivered', title_en: 'Delivered', title_bn: 'ডেলিভারি সম্পন্ন', time: 'Pending', completed: false }
    ]
  },
  {
    id: 'ord-103',
    orderNumber: 'CM-519230',
    date: '2026-10-05 04:00 PM',
    customerName: 'Farhana Akhter (ফারহানা আক্তার)',
    phone: '01911-223344',
    email: 'farhana.sav@gmail.com',
    address: 'Holding 88, Dendabor Road',
    district: 'Savar (সাভার)',
    area: 'Savar Cant., Dhaka',
    notes: 'Deliver afternoon',
    items: [
      {
        productId: 'cm-prod-002',
        name: 'Power Max Toilet Cleaner Ultra Clean (5 L)',
        size: '5 L',
        price: 680,
        quantity: 1,
        total: 680,
        image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&auto=format&fit=crop&q=80',
      },
      {
        productId: 'cm-prod-005',
        name: 'FreshAir Room Freshener Jasmine (300ml)',
        size: '300 ml',
        price: 270,
        quantity: 2,
        total: 540,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&auto=format&fit=crop&q=80',
      }
    ],
    subtotal: 1220,
    deliveryFee: 70,
    discount: 0,
    total: 1290,
    paymentMethod: 'cod',
    status: 'delivered',
    timeline: [
      { status: 'placed', title_en: 'Order Placed', title_bn: 'অর্ডার গ্রহণ', time: 'Oct 5, 04:00 PM', completed: true },
      { status: 'confirmed', title_en: 'Confirmed', title_bn: 'নিশ্চিতকৃত', time: 'Oct 5, 04:30 PM', completed: true },
      { status: 'processing', title_en: 'Packing & QC', title_bn: 'প্যাকিং সম্পন্ন', time: 'Oct 5, 06:00 PM', completed: true },
      { status: 'shipped', title_en: 'Shipped', title_bn: 'কুরিয়ারে হস্তান্তর', time: 'Oct 6, 09:00 AM', completed: true },
      { status: 'out_for_delivery', title_en: 'Out for Delivery', title_bn: 'ডেলিভারির পথে', time: 'Oct 6, 11:30 AM', completed: true },
      { status: 'delivered', title_en: 'Delivered', title_bn: 'ডেলিভারি সম্পন্ন', time: 'Oct 6, 01:20 PM', completed: true, current: true }
    ]
  },
  {
    id: 'ord-104',
    orderNumber: 'CM-338190',
    date: '2026-10-06 06:20 PM',
    customerName: 'Kazi Mainul (কাজী মাইনুল)',
    phone: '01678-998877',
    email: 'kazi.mainul@org.bd',
    address: 'Mission Road, Sadar',
    district: 'Chandpur (চাঁদপুর)',
    area: 'Chandpur Sadar',
    notes: 'School cleaning supplies',
    items: [
      {
        productId: 'cm-prod-007',
        name: 'BioShield Hospital-Grade Disinfectant (5 L)',
        size: '5 L',
        price: 950,
        quantity: 3,
        total: 2850,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
      },
      {
        productId: 'cm-prod-009',
        name: 'ProClean 360 Spin Mop & Stainless Bucket Set',
        size: '1 Set',
        price: 1390,
        quantity: 2,
        total: 2780,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
      }
    ],
    subtotal: 5630,
    deliveryFee: 0,
    discount: 0,
    total: 5630,
    paymentMethod: 'cod',
    status: 'confirmed',
    timeline: [
      { status: 'placed', title_en: 'Order Placed', title_bn: 'অর্ডার গ্রহণ', time: '06:20 PM', completed: true },
      { status: 'confirmed', title_en: 'Confirmed', title_bn: 'নিশ্চিতকৃত', time: '06:45 PM', completed: true, current: true },
      { status: 'processing', title_en: 'Packing & QC', title_bn: 'প্যাকিং সম্পন্ন', time: 'Pending', completed: false },
      { status: 'shipped', title_en: 'Shipped', title_bn: 'কুরিয়ারে হস্তান্তর', time: 'Pending', completed: false },
      { status: 'out_for_delivery', title_en: 'Out for Delivery', title_bn: 'ডেলিভারির পথে', time: 'Pending', completed: false },
      { status: 'delivered', title_en: 'Delivered', title_bn: 'ডেলিভারি সম্পন্ন', time: 'Pending', completed: false }
    ]
  }
];

export const INITIAL_CORPORATE_QUOTES: CorporateQuote[] = [
  {
    id: 'cq-001',
    name: 'Dr. S. M. Faruq',
    company: 'Evercare Diagnostic Center',
    phone: '01711-445566',
    email: 'procurement@evercare-diag.com',
    sector: 'Hospital / Healthcare',
    frequency: 'Monthly Scheduled Supply',
    requirements: 'Need 50 cans of BioShield 5L Disinfectant and 40 cans of SoftTouch 5L Hand Wash monthly.',
    date: '2026-10-06',
    status: 'new'
  },
  {
    id: 'cq-002',
    name: 'Nazmul Islam',
    company: 'Saffron Grand Restaurant & Suites',
    phone: '01819-223311',
    email: 'operations@saffrongrand.com',
    sector: 'Restaurant / Hotel',
    frequency: 'Monthly Scheduled Supply',
    requirements: '10x 5L DishWash Pro, 15x 5L Floor Cleaner Lemon, 10x FreshAir Room Freshener aerosol.',
    date: '2026-10-05',
    status: 'quoted'
  }
];
