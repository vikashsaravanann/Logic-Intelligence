export const COMPANY = {
  legalName: 'Logic Intelligence Technologies Pvt. Ltd.',
  displayName: 'Logic Intelligence Technologies',
  cin: 'U72900TZ2026PTC123456',
  address: 'Coimbatore, Tamil Nadu, India',
  email: 'contact@logicintelligencetechnologies.in',
  phone: '+91 93428 77474',
  whatsappNumber: '919342877474',
  whatsappGroupUrl: 'https://chat.whatsapp.com/IHHqqbi0t3P8pC9Dyou53k?mode=gi_t',
  telegramBotUrl: 'https://t.me/LogicIntelligenceTechnologiesbot',
  instagramUrl: 'https://www.instagram.com/logicintelligencetechnologies?igsi=MXVmbGU3M3JiOTNmdw%3D%3D&utm_source=qr',
  linkedinUrl: 'https://www.linkedin.com/company/logic-intelligence-technologies/',
  facebookUrl: 'https://www.facebook.com/share/166anMT53Cj/?mibextid=wwXIfr',
  websiteUrl: 'https://www.logicintelligencetechnologies.in',
  logoIconPath: '/assets/logo.jpg',
  logoFullPath: '/assets/logo.jpg',
  bannerPath: '/assets/banner.jpg',
  tagline: 'Where Logic Meets Innovation',
  founder: {
    name: 'Vikash Saravanan',
    title: 'Founder & Director',
    photoPath: '/assets/founder.jpg',
    bio: 'First-year B.Tech student in AI & Data Science, Vikash founded Logic Intelligence Technologies to bring modern, AI-integrated web and software development to businesses in Coimbatore and beyond — with transparent pricing and a free demo before you pay.',
  },
} as const;

export const LEGAL_LAST_UPDATED = 'August 23, 2026';

// Backward-compatibility alias kept for any existing imports
export const companyConfig = COMPANY;
