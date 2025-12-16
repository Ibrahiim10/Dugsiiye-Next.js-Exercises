import { ObjectId } from "mongodb";
import { CreateTodoInput, Todo, UpdateTodoInput, SearchParams } from "../types/todo";
import { getTodoCollection } from "./db";

export async function fetchTodos(params?: SearchParams): Promise<Todo[]> {
  try {
    const collection = await getTodoCollection();
    
    // Build query for search and filter
    const query: any = {};
    
    // Search with MongoDB $regex (case-insensitive)
    if (params?.query && params.query.trim() !== '') {
      query.title = { $regex: params.query, $options: 'i' };
    }
    
    // Filter by status
    if (params?.status === 'completed') {
      query.completed = true;
    } else if (params?.status === 'pending') {
      query.completed = false;
    }
    
    const todos = await collection.find(query).toArray();

    // Sort by priority (high -> medium -> low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const sortedTodos = todos.sort((a, b) => 
      priorityOrder[a.priority as keyof typeof priorityOrder] - 
      priorityOrder[b.priority as keyof typeof priorityOrder]
    );

    return sortedTodos.map(todo => ({
      _id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
      priority: todo.priority,
      createdAt: todo.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: todo.updatedAt?.toISOString()
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  try {
    const collection = await getTodoCollection();
    const todo = await collection.findOne({ _id: new ObjectId(id) });

    if (!todo) {
      return null;
    }

    return {
      _id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
      priority: todo.priority,
      createdAt: todo.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: todo.updatedAt?.toISOString()
    };
  } catch (error) {
    console.error('Error fetching todo by id:', error);
    return null;
  }
}

export async function createTodo(todo: CreateTodoInput): Promise<string | null> {
  try {
    const collection = await getTodoCollection();
    
    const result = await collection.insertOne({
      ...todo,
      completed: todo.completed || false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return result.insertedId.toString();
  } catch (error) {
    console.error('Error creating todo:', error);
    return null;
  }
}

export async function updateTodo(id: string, todo: UpdateTodoInput): Promise<boolean> {
  try {
    const collection = await getTodoCollection();
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...todo,
          updatedAt: new Date()
        } 
      }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating todo:', error);
    return false;
  }
}

export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const collection = await getTodoCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting todo:', error);
    return false;
  }
}

export async function bulkDeleteTodos(ids: string[]): Promise<number> {
  try {
    const collection = await getTodoCollection();
    const objectIds = ids.map(id => new ObjectId(id));
    const result = await collection.deleteMany({ _id: { $in: objectIds } });
    return result.deletedCount;
  } catch (error) {
    console.error('Error bulk deleting todos:', error);
    return 0;
  }
}

export async function bulkUpdateTodos(ids: string[], update: UpdateTodoInput): Promise<number> {
  try {
    const collection = await getTodoCollection();
    const objectIds = ids.map(id => new ObjectId(id));
    const result = await collection.updateMany(
      { _id: { $in: objectIds } },
      { 
        $set: { 
          ...update,
          updatedAt: new Date()
        } 
      }
    );
    return result.modifiedCount;
  } catch (error) {
    console.error('Error bulk updating todos:', error);
    return 0;
  }
}