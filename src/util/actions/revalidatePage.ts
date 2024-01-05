"use server"

import { revalidatePath } from "next/cache"

export async function revalidatePage(page: string) {
  revalidatePath(page)
}
