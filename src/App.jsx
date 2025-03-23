import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Product from './Product';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/product',
        element: <Product />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;