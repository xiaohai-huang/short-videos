import { Outlet, Navigate } from "react-router-dom";

import { useUser } from "@src/contexts/UserContext";

export default function RequireAuth() {
  const [user, loading] = useUser();
  if (loading) return <div>loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}
