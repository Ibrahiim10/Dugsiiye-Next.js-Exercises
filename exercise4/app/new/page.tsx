'use client'
import Link from 'next/link';
import { useActionState } from 'react';
import { createTodoAction } from '../actions/create';
import { AlertCircle, Zap, Circle } from 'lucide-react';

export default function NewTodo() {
  const [state, formAction] = useActionState(createTodoAction, null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Add New Todo</h1>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Todos
            </Link>
          </div>

          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Todo Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
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
                  <input type="radio" name="priority" value="low" className="peer sr-only" />
                  <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-green-600 peer-checked:bg-green-50 hover:border-gray-300 transition-all">
                    <div className="flex flex-col items-center gap-2 text-green-600">
                      <Circle size={20} />
                      <span className="text-sm font-medium">Low</span>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="priority" value="medium" defaultChecked className="peer sr-only" />
                  <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-yellow-600 peer-checked:bg-yellow-50 hover:border-gray-300 transition-all">
                    <div className="flex flex-col items-center gap-2 text-yellow-600">
                      <Zap size={20} />
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="priority" value="high" className="peer sr-only" />
                  <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-red-600 peer-checked:bg-red-50 hover:border-gray-300 transition-all">
                    <div className="flex flex-col items-center gap-2 text-red-600">
                      <AlertCircle size={20} />
                      <span className="text-sm font-medium">High</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{state.error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md"
              >
                Create Todo
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