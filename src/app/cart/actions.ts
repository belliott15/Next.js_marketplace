"use client";

import { createCart, getCart } from "@/lib/db/cart";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const itemInCart = cart?.items.find((item) => item.productId === productId);
}
