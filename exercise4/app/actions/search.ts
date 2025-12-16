'use server'

import { revalidatePath } from "next/cache";

export async function searchTodos(formData: FormData) {
  const query = formData.get('query') as string;
  const status = formData.get('status') as 'all' | 'completed' | 'pending';

  // In a real implementation, you would pass these to fetchTodos
  // For now, we'll just revalidate and let the page component handle it
  revalidatePath('/');
  
  return { 
    success: true, 
    query: query || '', 
    status: status || 'all' 
  };
}