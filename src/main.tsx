import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from './utils/storage/token'
import { ILoginAction, ITokenUser, SignActionTypes } from './features/user-pages/store/types'
import { jwtDecode } from 'jwt-decode'
import getRoleById from './utils/roles/get-role-by-id'
import rolesAccess from './utils/roles/roles-access'
import Loader from './components/loader'
import { InformationMessengerActionTypes } from './components/error-information-messenger/store/types.ts'

// eslint-disable-next-line react-refresh/only-export-components
const RootWrapper = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getUser() {
      const token = getTokenFromLocalStorage();

      try {
        if (token) {
          const decodedUser = jwtDecode<ITokenUser>(token);

          if (decodedUser.exp < Date.now() / 1000) {
            removeTokenFromLocalStorage();
            return;
          }

          const role = await getRoleById(decodedUser.roleId);

          store.dispatch({
            type: SignActionTypes.LOGIN,
            payload: {
              email: decodedUser.email,
              userId: decodedUser.userId,
              roleId: role.data.id,
              role: rolesAccess[role.data.name.toLowerCase()] || rolesAccess.guest,
            }
          } as ILoginAction);
        }
      }
      catch (error: unknown) {
        store.dispatch({ type: InformationMessengerActionTypes.SHOW_INFORMATION_MESSENGER, payload: error });
      }
      finally {
        setIsLoaded(true);
      }
    }

    getUser();
  }, []);

  return (
    <StrictMode>
      {isLoaded ? (
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      ) :
        (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Loader visible={!isLoaded} />
          </div>
        )}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(
  <RootWrapper />,
)