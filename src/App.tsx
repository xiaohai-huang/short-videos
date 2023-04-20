import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Videos from "@components/Videos/Videos";
import SupabaseTest from "./pages/supabase-test";

import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import RequireAuth from "@components/RequireAuth";
import Login from "./pages/login";
import SpringTest from "./pages/spring-test";
import AnimationWrapper from "@components/AnimationWrapper";
import AnimationDetails from "./pages/animation/[id]";
import Layout from "@components/Layout";
import Profile from "./pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Videos />,
      },
      {
        path: "messages",
        element: (
          <div>
            <Link to="/animation/0">to animation/0</Link>
          </div>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <RequireAuth />,
    children: [
      {
        path: "supabase-test",
        element: <SupabaseTest />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/animation",
    element: <AnimationWrapper />,
    children: [
      {
        path: "first",
        element: <SpringTest />,
      },
      {
        path: ":id",
        element: <AnimationDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
