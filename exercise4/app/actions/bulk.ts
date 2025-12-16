'use server'

import { revalidatePath } from "next/cache";
import { bulkDeleteTodos, bulkUpdateTodos } from "../lib/todo";

export async function bulkDeleteAction(formData: FormData) {
  const idsString = formData.get('ids') as string;
  
  if (!idsString) {
    return { success: false, error: 'No todos selected' };
  }

  const ids = JSON.parse(idsString);
  
  if (!Array.isArray(ids) || ids.length === 0) {
    return { success: false, error: 'No todos selected' };
  }

  const deletedCount = await bulkDeleteTodos(ids);

  revalidatePath('/');
  return { success: true, deletedCount };
}

export async function bulkMarkCompleteAction(formData: FormData) {
  const idsString = formData.get('ids') as string;
  
  if (!idsString) {
    return { success: false, error: 'No todos selected' };
  }

  const ids = JSON.parse(idsString);
  
  if (!Array.isArray(ids) || ids.length === 0) {
    return { success: false, error: 'No todos selected' };
  }

  const updatedCount = await bulkUpdateTodos(ids, { completed: true });

  revalidatePath('/');
  return { success: true, updatedCount };
}

export async function bulkMarkIncompleteAction(formData: FormData) {
  const idsString = formData.get('ids') as string;
  
  if (!idsString) {
    return { success: false, error: 'No todos selected' };
  }

  const ids = JSON.parse(idsString);
  
  if (!Array.isArray(ids) || ids.length === 0) {
    return { success: false, error: 'No todos selected' };
  }

  const updatedCount = await bulkUpdateTodos(ids, { completed: false });

  revalidatePath('/');
  return { success: true, updatedCount };
}
