import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import RegistrationPage from '../components/pages/RegistrationPage/RegistrationPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage';
import UserTable from '../components/pages/UserPage/UserTable';
import ListTable from '../components/pages/ListPage/ListTable';
import UserPage from '../components/pages/UserPage/UserPage';
import authorities from '../config/Authorities';

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/registration'} element={<RegistrationPage />} />

      <Route
        path={'/user'}
        element={<PrivateRoute requiredAuths={[]} element={<UserTable />} />}
      />
      <Route
        path={'/list'}
        element={<PrivateRoute requiredAuths={[]} element={<ListTable />} />}
      />
      <Route
        path='/user/edit'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_CREATE]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path='/user/edit/:userId'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_CREATE]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />

      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
