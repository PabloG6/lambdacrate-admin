

'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (


<div className="flex flex-col min-h-screen">
  <header className="px-4 lg:px-6 h-14 flex items-center">
    <a className="flex items-center justify-center" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="h-6 w-6"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
      </svg>
      <span className="sr-only">Acme Inc</span>
    </a>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        Features
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        Pricing
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        About
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        Contact
      </a>
    </nav>
  </header>
  <main className="flex-1">
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Oops!</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Looks like you&apos;ve encountered an error. Don&apos;t worry, we&apos;re working on it.
            </p>
          </div>
          <div className="space-x-4">
            <a
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Go Home
            </a>
            <a
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Search
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <a className="text-xs hover:underline underline-offset-4" href="#">
        Terms of Service
      </a>
      <a className="text-xs hover:underline underline-offset-4" href="#">
        Privacy
      </a>
    </nav>
  </footer>
</div>
  )
}