/**
 * Calculate the unit price for a single shirt.
 * Adds the base price, size surcharge, and sleeve surcharge together.
 */
export function calculateUnitPrice(
  basePrice: number,
  sizeSurcharge: number,
  sleeveSurcharge: number
): number {
  const raw = basePrice + sizeSurcharge + sleeveSurcharge;
  return Math.round(raw * 100) / 100;
}

/**
 * Calculate the line total for an order item.
 * Multiplies unit price by quantity.
 */
export function calculateLineTotal(unitPrice: number, quantity: number): number {
  const raw = unitPrice * quantity;
  return Math.round(raw * 100) / 100;
}

/**
 * Calculate the total price and total quantity for an entire order.
 */
export function calculateOrderTotal(
  items: { unitPrice: number; quantity: number }[]
): { totalPrice: number; totalQuantity: number } {
  let totalPrice = 0;
  let totalQuantity = 0;

  for (const item of items) {
    totalPrice += calculateLineTotal(item.unitPrice, item.quantity);
    totalQuantity += item.quantity;
  }

  return {
    totalPrice: Math.round(totalPrice * 100) / 100,
    totalQuantity,
  };
}
