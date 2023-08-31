import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    // let user = JSON.parse(localStorage.getItem("loginInfo"));
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("loginInfo"));
    }
    let userIsAuthenticated = user !== null;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push("/admin");
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
