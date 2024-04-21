import { Suspense } from "react"
import Loading from "./[app_id]/loading"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {


    return <>
          <nav className="h-12 flex items-center pl-24 border-b"></nav>
    <Suspense fallback={<Loading/>}>
    {children}
    </Suspense>
  
    </>
}