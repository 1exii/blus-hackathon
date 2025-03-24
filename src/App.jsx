import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Quiz from "./Quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
