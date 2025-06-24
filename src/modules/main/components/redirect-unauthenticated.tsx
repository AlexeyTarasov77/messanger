import { Redirect } from "expo-router";
import { useAuthCtx } from "../../users/components/users-ctx";
import { ReactNode } from "react";
import { usePathname } from "expo-router";
import { Loader } from "../../../shared/ui/loader/loader";

export function RedirectUnauthenticated({ children }: { children: ReactNode }) {
  const unauthenticatedRoutes = ["/users/login", "/users/register"];
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthCtx();
  if (isLoading) {
    return <Loader />;
  }
  console.log("Current path", pathname);
  if (isAuthenticated) {
    return children;
  }
  for (let i = 0; i < unauthenticatedRoutes.length; i++) {
    if (pathname.startsWith(unauthenticatedRoutes[i])) {
      return children;
    }
  }
  console.log(`Redirecting from ${pathname} to login`);
  return <Redirect href="/users/login" />;
}
