import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOption } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - Marketplace",
};

const addProduct = async (formData: FormData) => {
  "use server";

  const session = await getServerSession(authOption);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
};

const AddProductPage = async () => {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          type="text"
          className="mb-3 w-full input input-bordered"
          placeholder="Product Name"
          name="name"
        />
        <textarea
          placeholder="Product Description"
          required
          name="description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          type="url"
          className="mb-3 w-full input input-bordered"
          placeholder="Image URL"
          name="imageUrl"
        />
        <input
          required
          type="number"
          className="mb-3 w-full input input-bordered"
          placeholder="Price"
          name="price"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;
