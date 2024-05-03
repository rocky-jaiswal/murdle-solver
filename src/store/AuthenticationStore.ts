import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

export interface AuthState {
  jsonToken: string | null
  signIn: () => void
  signOut: () => void
}

export const defaultAuthenticationState: AuthState = {
  jsonToken: null,
  signIn: () => {
    console.log('not invoked')
  },
  signOut: () => {
    console.log('not invoked 2')
  },
}

export const useAuthenticationStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        jsonToken: defaultAuthenticationState.jsonToken,
        signIn: () =>
          set((_state) => ({
            jsonToken: 'dummy',
          })),
        signOut: () =>
          set((_state) => ({
            jsonToken: null,
          })),
      }),
      {
        name: 'authentication-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)
