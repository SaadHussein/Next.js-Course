"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title || title.trim() === "") {
    errors.push("Title is Required.");
  }
  if (!content || content.trim() === "") {
    errors.push("Content is Required.");
  }
  if (!image || image.size === 0) {
    errors.push("Image is Required.");
  }

  if (errors.length > 0) {
    return { errors };
  }
  console.log("Post created:", { title, image, content });

  let imageUrl = "";
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Image upload failed, post wasn't created. Please try again later."
    );
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
}
