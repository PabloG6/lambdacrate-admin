import { Adapter, DatabaseSession, DatabaseUser } from "lucia";

export class MyAdapter implements Adapter {
    async getSessionAndUser(sessionId: string): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
      throw new Error("getSession And User called");

    }
    async getUserSessions(userId: string): Promise<DatabaseSession[]> {
        throw new Error("get session and user error.");
    }
   async setSession(session: DatabaseSession): Promise<void> {
    throw new Error("set session and user error.");

}
    async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
        throw new Error("update session expiration and user error.");

    }
   async  deleteSession(sessionId: string): Promise<void> {
    throw new Error("delete session expiration and user error.");

    
    }
    async deleteUserSessions(userId: string): Promise<void> {
        throw new Error("delete user session expiration and user error.");

    }
    async deleteExpiredSessions(): Promise<void> {
        throw new Error("delete expired session and user error.");

    }

}