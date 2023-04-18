import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Videos from "@components/Videos/Videos";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Videos />,
  },
  {
    path: "/videos",
    element: <Videos />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
