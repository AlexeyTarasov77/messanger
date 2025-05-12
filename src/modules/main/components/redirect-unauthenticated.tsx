import { Redirect } from "expo-router";
import { useUserCtx } from "../../users/components/users-ctx/context";
import { ReactNode } from "react";
import { usePathname } from "expo-router"

export function RedirectUnauthenticated({ children }: { children: ReactNode }) {
  const unauthenticatedRoutes = ["/users/login", "/users/register"]
  const pathname = usePathname()
  console.log(pathname)
  const { user } = useUserCtx()
  for (let i = 0; i < unauthenticatedRoutes.length; i++) {
    if (pathname.startsWith(unauthenticatedRoutes[i])) {
      return children
    }
  }
  if (!user) {
    console.log(`Redirecting from ${pathname} to login`)
    return <Redirect href="/users/login" />
  }
  return children
}
