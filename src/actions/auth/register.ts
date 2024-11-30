"use server";

import bcryptjs from "bcryptjs";

import prisma from "@/lib/prisma";

interface Props {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ email, name, password }: Props) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLocaleLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: "Usuario creado",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
};
