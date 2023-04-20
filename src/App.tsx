import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Videos from "@components/Videos/Videos";
import SupabaseTest from "./pages/supabase-test";

import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import RequireAuth from "@components/RequireAuth";
import Login from "./pages/login";
import SpringTest from "./pages/spring-test";
import AnimationWrapper from "@components/AnimationWrapper";
import AnimationDetails from "./pages/animation/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Videos />,
  },
  {
    path: "/videos",
    element: <Videos />,
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
