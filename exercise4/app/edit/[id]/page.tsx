import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchTodoById } from '../../lib/todo';
import { updateTodoAction } from '../../actions/update';
import { AlertCircle, Zap, Circle, Clock } from 'lucide-react';

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

interface EditTodoPageProps {
  params: {
    id: string;
  };
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const todo = await fetchTodoById(params.id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Edit Todo</h1>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Todos
            </Link>
          </div>

          <form action={updateTodoAction} className="space-y-6">
            <input type="hidden" name="id" value={todo._id} />

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Todo Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={todo.title}
                placeholder="Enter your todo..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                maxLength={200}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">Maximum 200 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="priority" 
                    value="low" 
                    defaultChecked={todo.priority === 'low'}
                    className="peer sr-only" 
                  />
                  <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-green-600 peer-checked:bg-green-50 hover:border-gray-300 transition-all">
                    <div className="flex flex-col items-center gap-2 text-green-600">
                      <Circle size={20} />
                      <span className="text-sm font-medium">Low</span>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="priority" 
                    value="medium" 
                    defaultChecked={todo.priority === 'medium'}
                    className="peer sr-only" 
                  />
                  <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-yellow-600 peer-checked:bg-yellow-50 hover:border-gray-300 transition-all">
                    <div className="flex flex-col items-center gap-2 text-yellow-600">
                      <Zap size={20} />
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="priority" 
                    value="high" 
                    defaultChecked={todo.priority === 'high'}
                    className="peer sr-only" 
                  />
                  <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-red-600 peer-checked:bg-red-50 hover:border-gray-300 transition-all">
                    <div className="flex flex-col items-center gap-2 text-red-600">
                      <AlertCircle size={20} />
                      <span className="text-sm font-medium">High</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>{' '}
                <span className={todo.completed ? 'text-green-600' : 'text-amber-600'}>
                  {todo.completed ? '✓ Completed' : '○ Pending'}
                </span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Clock size={14} />
                <span className="font-medium">Created:</span> {getRelativeTime(todo.createdAt)}
              </p>
              {todo.updatedAt && (
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock size={14} />
                  <span className="font-medium">Last updated:</span> {getRelativeTime(todo.updatedAt)}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md"
              >
                Update Todo
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}