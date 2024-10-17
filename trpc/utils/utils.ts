import { AuthContext } from "../contexts/auth";

export function buildAuthHeaders({token}: AuthContext, headers: {}  = {}) {
    return {
        authorization: `Bearer ${token}`,
        ...headers
      }
}