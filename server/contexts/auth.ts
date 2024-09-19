import { sessionCookieName } from '@/lib/auth/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { NextRequest } from 'next/server';


export async function createContext(opts: NextRequest) {

    const token  = await cookies().get(sessionCookieName)?.value;
    return {
        token,
    }

}


export type AuthContext = Awaited<ReturnType<typeof createContext>>;

