"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

const CartEntry = ({ cartItem: { product, quantity } }: CartEntryProps) => {
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <p>Price: {formatPrice(product.price)}</p>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered w-full max-w-[80px] overflow-hidden"
              defaultValue={quantity}
              onChange={(e) => {
                e;
              }}
            >
              {quantityOptions}
            </select>
          </div>
          <p className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}{" "}
          </p>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};
export default CartEntry;
