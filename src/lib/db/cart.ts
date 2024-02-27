import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

//create an empty cart and it will automatically instantiate with
//createdAt data
export async function createCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOption);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    //in production you should encrypt the newCart id to make sure
    //people cannot change
    cookies().set("localCartId", newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

//Pull cart information from mongodb using prisma and the cookie

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOption);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    //access the cookie that holds the localCartId
    const localCartId = cookies().get("localCartId")?.value;

    //if there is a localCartId return all cart information where the
    //cookieID matches the cart id and include all products
    //matching that localCartID
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { product: true } } },
        })
      : null;
  }

  //if the cart returns null return null
  if (!cart) {
    return null;
  }

  // we want to return the cart items as well as additional info

  return {
    ...cart,
    //the size of the cart which we get from reducing the array
    //of items in the cart including their quantity
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    //we also want to return the total cost of the cart by reducing
    //the quantity multiplied by the price
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}
