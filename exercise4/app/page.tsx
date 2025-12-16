import { fetchTodos } from './lib/todo'
import { toggleTodo } from './actions/toggle'
import { deleteTodo } from './actions/delete'
import Link from 'next/link'
import {
  Search,
  Filter,
  Clock,
  AlertCircle,
  Zap,
  Circle,
  Trash2,
  Edit2,
  Check,
} from 'lucide-react'

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  return date.toLocaleDateString()
}

function getPriorityBadge(priority: string) {
  const colors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }

  const icons = {
    high: <AlertCircle size={14} />,
    medium: <Zap size={14} />,
    low: <Circle size={14} />,
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        colors[priority as keyof typeof colors]
      }`}
    >
      {icons[priority as keyof typeof icons]}
      {priority}
    </span>
  )
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string
    status?: 'all' | 'completed' | 'pending'
  }>
}) {
  // ✅ MUST await searchParams in Next.js 15
  const { query = '', status = 'all' } = await searchParams

  const todos = await fetchTodos({ query, status })
  const time = new Date().toLocaleTimeString()

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
    high: todos.filter((t) => t.priority === 'high').length,
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              📋 Todo App
            </h1>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={14} />
              Last updated: {time}
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <form className="flex gap-3 mb-3">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="query"
                  defaultValue={query}
                  placeholder="Search todos..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-3 bg-blue-600 text-white rounded-lg">
                <Search size={20} />
              </button>
            </form>

            {/* Status Filters */}
            <div className="flex gap-2">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  status === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'border bg-white'
                }`}
              >
                All ({stats.total})
              </Link>

              <Link
                href="/?status=pending"
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  status === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'border bg-white'
                }`}
              >
                Pending ({stats.pending})
              </Link>

              <Link
                href="/?status=completed"
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  status === 'completed'
                    ? 'bg-green-600 text-white'
                    : 'border bg-white'
                }`}
              >
                Completed ({stats.completed})
              </Link>
            </div>
          </div>

          {/* Add Button */}
          <div className="mb-8">
            <Link
              href="/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md"
            >
              ➕ Add New Todo
            </Link>
          </div>

          {/* Todos */}
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-16">
              No todos found
            </p>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex justify-between items-center p-4 bg-gray-50 border rounded-xl"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <form action={toggleTodo.bind(null, todo._id)}>
                      <button className="w-8 h-8 border rounded-lg flex items-center justify-center">
                        {todo.completed && <Check size={20} />}
                      </button>
                    </form>

                    <div>
                      <div className="flex items-center gap-2">
                        <p
                          className={`${
                            todo.completed
                              ? 'line-through text-gray-500'
                              : 'font-medium'
                          }`}
                        >
                          {todo.title}
                        </p>
                        {getPriorityBadge(todo.priority)}
                      </div>
                      <p className="text-xs text-gray-400">
                        {getRelativeTime(todo.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/edit/${todo._id}`}>
                      <Edit2 size={18} />
                    </Link>

                    <form action={deleteTodo.bind(null, todo._id)}>
                      <button>
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
