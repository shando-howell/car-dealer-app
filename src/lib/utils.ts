import { CurrencyCode } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FormatPriceArgs {
  price: number | null;
  currency: CurrencyCode | null
}

export function formatPrice({price, currency}: FormatPriceArgs) {
  if (!price) return '0';

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currencyDisplay: "symbol",
    ...(currency && {currency}),
    maximumFractionDigits: 0,
  })

  if (currency === 'USD') {
    return formatter.format(price / 100).replace("US$", "$");
  }

  return formatter.format(price / 100);
}
