'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";
import { Priority } from "../types/todo";

export async function createTodoAction(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const priority = (formData.get('priority') as Priority) || 'medium';

  if (!title || title.trim().length === 0) {
    return { success: false, error: 'Title is required' };
  }

  if (title.length > 200) {
    return { success: false, error: 'Title must be less than 200 characters' };
  }

  const todoId = await createTodo({ 
    title: title.trim(),
    priority 
  });

  if (!todoId) {
    return { success: false, error: 'Failed to create todo' };
  }

  revalidatePath('/');
  redirect('/');
}