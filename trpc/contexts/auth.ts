import { sessionCookieName } from '@/lib/auth/lucia';
import { cookies } from 'next/headers';



export async function createContext() {

    const token  = await cookies().get(sessionCookieName)?.value;
    return {
        token,
    }

}


export const createTRPCContext = async (opts: { headers: Headers }) => {
  const token  = await cookies().get(sessionCookieName)?.value;

    return {
      token,
      ...opts,
    };
  };

  export  type Context = Awaited<ReturnType<typeof createTRPCContext>>;
export type AuthContext = Awaited<ReturnType<typeof createContext>>;

