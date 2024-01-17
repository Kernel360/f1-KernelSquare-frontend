"use server"

import { revalidatePath } from "next/cache"

export async function revalidatePage(page: string, type?: "page" | "layout") {
  revalidatePath(page, type)
}
