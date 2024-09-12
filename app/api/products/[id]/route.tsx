import {NextRequest, NextResponse} from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  {params}: {params: {id: string}},
) {
  const id = Number(params.id);
  const product = await prisma.product.findUnique({
    where: {id},
  });

  if (!product) return NextResponse.json({error: "Product not found"});

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  {params}: {params: {id: string}},
) {
  const id: number = Number(params.id);
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {status: 400});
  }

  const product = await prisma.product.findUnique({
    where: {id},
  });

  if (!product) {
    NextResponse.json({error: "Product not found!"}, {status: 400});
  }

  const updatedProduct = await prisma.product.update({
    where: {id: product.id},
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  request: NextRequest,
  {params}: {params: {id: number}},
) {
  const id = Number(params.id);

  const product = await prisma.product.findUnique({where: {id}});

  if (!product)
    return NextResponse.json({error: "Product not found!"}, {status: 404});

  await prisma.product.delete({
    where: {id},
  });

  return NextResponse.json({});
}
