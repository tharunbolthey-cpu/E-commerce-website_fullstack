'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Currency,
  formatPrice,
  getCurrency,
} from '../utils/currency';


export function useCurrency() {
  const [currency, setCurrency] =
    useState<Currency>('INR');

  useEffect(() => {

    const loadCurrency = () => {
      setCurrency(getCurrency());
    };

    loadCurrency();

    window.addEventListener(
      'atelier-store-settings-changed',
      loadCurrency
    );

    return () => {
      window.removeEventListener(
        'atelier-store-settings-changed',
        loadCurrency
      );
    };

  }, []);

  const price = (amount: number) => {
    return new Intl.NumberFormat(
      currency === 'INR'
        ? 'en-IN'
        : currency === 'USD'
        ? 'en-US'
        : 'de-DE',
      {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
      }
    ).format(amount);
  };

  return {
    currency,
    price,
  };
}