import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DecodedToken, decodeJWT } from "@/utils/jwt";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      login: (token) => {
        const user = decodeJWT(token);
        set({ isLoggedIn: true, token, user });
      },
      logout: () => {
        localStorage.removeItem("auth-token");
        set({ isLoggedIn: false, token: null, user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
