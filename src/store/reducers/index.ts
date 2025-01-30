import { combineReducers } from "redux";
import { signReducer } from '../../features/user-pages/store/reducer';
import { informationMessengerReducer } from '../../components/error-information-messenger/store/recuder';

export const rootReducer = combineReducers({
    sign: signReducer,
    informationMessenger: informationMessengerReducer
});

export type RootState = ReturnType<typeof rootReducer>;