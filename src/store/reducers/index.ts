import { combineReducers } from "redux";
import { signReducer } from '../../features/user-pages/store/reducer';
import { informationMessengerReducer } from '../../components/error-information-messenger/store/recuder';
import { tagReducer } from '../../features/crud-pages/tags/store/reducer';
import { roleReducer } from "../../features/crud-pages/roles/store/reducer";
import { statusReducer } from "../../features/crud-pages/statuses/store/reducer";
import { genreReducer } from "../../features/crud-pages/genres/store/reducer";
import { actorReducer } from "../../features/crud-pages/actors/store/reducer";
import { hallReducer } from "../../features/crud-pages/halls/store/reducer";
import { movieReducer } from "../../features/crud-pages/movies/store/reducer";
import { genreTagReducer } from "../../features/crud-pages/genres-tags/store/reducer";
import { movieActorReducer } from "../../features/crud-pages/movies-actors/store/reducer";
import { movieGenreReducer } from "../../features/crud-pages/movies-genres/store/reducer";
import { movieTagReducer } from "../../features/crud-pages/movies-tags/store/reducer";
import { movieRatingReducer } from "../../features/crud-pages/movies-rating/store/reducer";
import { seatReducer } from "../../features/crud-pages/seats/store/reducer";
import { userReducer } from "../../features/crud-pages/users/store/reducer";
import { sessionReducer } from "../../features/crud-pages/sessions/store/reducer";
import { ticketReducer } from "../../features/crud-pages/tickets/store/reducer";
import { purchaseHistoryReducer } from "../../features/crud-pages/purchase-histories/store/reducer";

export const rootReducer = combineReducers({
    sign: signReducer,
    informationMessenger: informationMessengerReducer,
    tag: tagReducer,
    role: roleReducer,
    status: statusReducer,
    genre: genreReducer,
    actor: actorReducer,
    hall: hallReducer,
    movie: movieReducer,
    genreTag: genreTagReducer,
    movieActor: movieActorReducer,
    movieGenre: movieGenreReducer,
    movieTag: movieTagReducer,
    movieRating: movieRatingReducer,
    seat: seatReducer,
    user: userReducer,
    session: sessionReducer,
    ticket: ticketReducer,
    purchaseHistory: purchaseHistoryReducer
});

export type RootState = ReturnType<typeof rootReducer>;