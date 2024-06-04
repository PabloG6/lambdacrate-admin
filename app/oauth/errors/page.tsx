import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-4 text-center">
        <p className="text-5xl text-center font-bold pb-8 text-muted-foreground">
          400
        </p>
        <div className="text-2xl font-semibold text-center ">
          Whoops, something went wrong when trying to authenticate your app.
        </div>
        <Button className="text-sm text-center" variant={"outline"} asChild>
          
          <Link href="/login">Please try again</Link>
        </Button>
      </div>
    </main>
  );
}
