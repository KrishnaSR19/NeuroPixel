"use server";

import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";


//ADD IMAGE
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);
    if (!author) throw new Error("Author not found");

    const newImage = await Image.create({
      ...image,
      author: author._id,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError;
  }
}

//UPDATE IMAGE

export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await connectToDatabase();

    revalidatePath(path);

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError;
  }
}

//DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    await connectToDatabase();

    revalidatePath(path);

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError;
  }
}

//GET IMAGE BY ID
export async function getImageById(imageId: string) {
  try {
    await connectToDatabase();

    revalidatePath(path);

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError;
  }
}
