import { Routes } from 'react-router';
import './App.css';
import { Navigate, Route } from 'react-router-dom'
import routes from './routes'
import Layout from './components/layout';
import Login from './features/user-pages/login';
import { useTypedSelector } from './hooks/useTypedSelector';
import Register from './features/user-pages/register';
import { baseViteUrl } from './utils/enviroment/settings';

const App = () => {
  const { isLoggined, role } = useTypedSelector(state => state.sign);

  return (
    <Routes>
      <Route path={baseViteUrl} element={<Layout />}>
        {
          routes.map(x =>
            role?.includes(x.accessLevel) &&
              x.nested ? x.nested.map(x2 =>
                role.includes(x2.accessLevel) &&
                (
                  x2.component && (
                    <Route
                      key={`${x2.path}`}
                      path={`${x.path}${x2.path}`}
                      element={<x2.component />} />
                  )
                ))
              :
              x.component &&
              <Route
                key={x.path}
                path={x.path}
                element={<x.component />} />
          )
        }
        {
          !isLoggined &&
          <>
            <Route path={`${baseViteUrl}/login`} element={<Login />} />
            <Route path={`${baseViteUrl}/register`} element={<Register />} />
          </>
        }
      </Route>
      <Route path='*' element={isLoggined ? <Navigate to={`${baseViteUrl}/`} /> : <Navigate to={`${baseViteUrl}/login`} />} />
    </Routes>
  );
}

export default App;
