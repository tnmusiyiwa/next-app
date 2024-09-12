import {error} from "console";
import {NextRequest, NextResponse} from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: {id: string};
}

export async function GET(request: NextRequest, {params}: Props) {
  const id = Number(params.id);

  if (!params.id)
    return NextResponse.json({error: "User Id is required!"}, {status: 400});

  const user = await prisma.user.findUnique({where: {id}});

  if (!user)
    return NextResponse.json({error: "User not found!"}, {status: 404});

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  {params}: {params: {id: string}},
) {
  const id = parseInt(params.id);

  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400});

  const user = await prisma.user.findUnique({where: {id}});

  if (!user) return NextResponse.json({error: "User not found"}, {status: 404});

  const updatedUser = await prisma.user.update({
    where: {id: user.id},
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  {params}: {params: {id: string}},
) {
  const id = Number(params.id);

  const user = await prisma.user.findUnique({where: {id}});

  if (!user) {
    return NextResponse.json({error: "User not found"}, {status: 404});
  }

  await prisma.user.delete({
    where: {id},
  });

  return NextResponse.json({});
}
