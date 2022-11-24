import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import CategoryProducts from '../../Pages/CategoryProducts/CategoryProducts/CategoryProducts';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import ErrorPage from '../../Pages/Shared/ErrorPage/ErrorPage';
import SignUp from '../../Pages/SignUp/SignUp';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/home',
        element: <Home></Home>,
      },
      {
        path: '/category/:id',
        element: (
          <PrivateRoutes>
            <CategoryProducts></CategoryProducts>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/categories/${params.id}`),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
