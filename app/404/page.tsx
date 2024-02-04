
import Link from "next/link"

export default function Component() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">404</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Sorry, the page you are looking for could not be found.
        </p>
        <div className="mt-6">
          <Link
            className="text-base font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            href="#"
          >
            Go back home
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

