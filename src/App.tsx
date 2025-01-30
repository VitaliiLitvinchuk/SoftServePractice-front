import { Routes } from 'react-router';
import './App.css';
import { Navigate, Route } from 'react-router-dom'
import rootPath, { routes } from './routes'
import Layout from './components/layout';
import Login from './features/user-pages/login';
import { useTypedSelector } from './hooks/useTypeSelector';
import Register from './features/user-pages/register';
import Loader from './components/loader';

const App = () => {
  const { isLoggined, role } = useTypedSelector(state => state.sign);

  return (
    <Routes>
      <Route path={rootPath} element={<Layout />}>
        {
          routes.map(x =>
            role?.includes(x.accessLevel) ?
              (
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
              : (
                <div className="d-flex justify-content-center align-items-center vh-100">
                  <Loader visible />
                </div>
              )
          )
        }
        {
          !isLoggined &&
          <>
            <Route path={`${rootPath}/login`} element={<Login />} />
            <Route path={`${rootPath}/register`} element={<Register />} />
          </>
        }
      </Route>
      <Route path='*' element={isLoggined ? <Navigate to={`${rootPath}/`} /> : <Navigate to={`${rootPath}/login`} />} />
    </Routes>
  );
}

export default App;
