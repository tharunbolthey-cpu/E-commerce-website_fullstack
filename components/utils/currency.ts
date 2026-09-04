export type Currency = 'INR' | 'USD' | 'EUR';

const currencyConfig = {
  INR: {
    locale: 'en-IN',
    currency: 'INR',
  },
  USD: {
    locale: 'en-US',
    currency: 'USD',
  },
  EUR: {
    locale: 'de-DE',
    currency: 'EUR',
  },
};

export function getCurrency(): Currency {
  if (typeof window === 'undefined') {
    return 'INR';
  }

  try {
    const stored =
      localStorage.getItem(
        'atelier-store-settings'
      );

    if (stored) {
      const settings = JSON.parse(stored);

      if (
        settings.currency === 'USD' ||
        settings.currency === 'EUR' ||
        settings.currency === 'INR'
      ) {
        return settings.currency;
      }
    }
  } catch {
    // Use INR if settings cannot be read
  }

  return 'INR';
}


export function formatPrice(
  amount: number
): string {
  const currency = getCurrency();

  const config =
    currencyConfig[currency];

  return new Intl.NumberFormat(
    config.locale,
    {
      style: 'currency',
      currency: config.currency,
      maximumFractionDigits: 2,
    }
  ).format(amount);
}