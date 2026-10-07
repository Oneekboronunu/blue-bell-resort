export function formatPrice(amount: number, symbol: string = '৳'): string {
  if (isNaN(amount)) return `${symbol} 0`;
  return `${symbol} ${Number(amount).toLocaleString('en-BD')}`;
}

export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString?: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function getHotelSchema(settings: {
  hotel_name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: settings.hotel_name,
    description: settings.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: 'Chattogram',
      addressRegion: 'Chattogram Division',
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: settings.latitude,
      longitude: settings.longitude,
    },
    telephone: settings.phone,
    email: settings.email,
    priceRange: '৳4,500 - ৳25,000',
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
  };
}
