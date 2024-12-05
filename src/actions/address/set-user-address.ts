"use server";

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrRepleaceAddress(address, userId);

    // console.log({ newAddress });

    return {
      ok: true,
      address: newAddress,
      message: "Grabado con exito",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};

const createOrRepleaceAddress = async (address: Address, userId: string) => {
  try {
    // console.log({ userId });

    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId: userId },
    });

    const addresToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addresToSave,
      });

      return newAddress;
    }

    const updateAddress = await prisma.userAddress.update({
      where: {
        userId: userId,
      },
      data: addresToSave,
    });

    return updateAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la dirección");
  }
};
