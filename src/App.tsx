import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Videos from "@components/Videos/Videos";
import SupabaseTest from "./pages/supabase-test";

import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import RequireAuth from "@components/RequireAuth";
import Login from "./pages/login";
import AnimationWrapper from "@components/AnimationWrapper";
import AnimationDetails from "./pages/animation/[id]";
import Layout from "@components/Layout";
import Profile from "./pages/profile";
import AnimateHeight from "@components/Tests/AnimateHeight";

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
        element: <AnimationWrapper />,
        children: [
          {
            index: true,
            element: (
              <div>
                <h1>I am the /messages Tab</h1>
                <Link to="1">to /messages/1</Link>
                <AnimateHeight />
              </div>
            ),
          },
          {
            path: ":id",
            element: <AnimationDetails />,
          },
        ],
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
