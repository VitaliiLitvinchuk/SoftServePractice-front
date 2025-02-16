import * as SignActions from "../../features/user-pages/store/actions";
import * as InformationMessengerActions from "../../components/error-information-messenger/store/actions";
import * as TagActions from "../../features/crud-pages/tags/store/actions";
import * as RoleActions from "../../features/crud-pages/roles/store/actions";
import * as StatusActions from "../../features/crud-pages/statuses/store/actions";
import * as GenreActions from "../../features/crud-pages/genres/store/actions";
import * as ActorActions from "../../features/crud-pages/actors/store/actions";
import * as HallActions from "../../features/crud-pages/halls/store/actions";
import * as MovieActions from "../../features/crud-pages/movies/store/actions";
import * as GenresTagsActions from "../../features/crud-pages/genres-tags/store/actions";
import * as MovieActorActions from "../../features/crud-pages/movies-actors/store/actions";
import * as MoviesGenresActions from "../../features/crud-pages/movies-genres/store/actions";
import * as MovieTagActions from "../../features/crud-pages/movies-tags/store/actions";
import * as MoviesRatingsActions from "../../features/crud-pages/movies-rating/store/actions";
import * as SeatsActions from "../../features/crud-pages/seats/store/actions";
import * as UsersActions from "../../features/crud-pages/users/store/actions";
import * as SessionsActions from "../../features/crud-pages/sessions/store/actions";
import * as TicketsActions from "../../features/crud-pages/tickets/store/actions";
import * as PurchaseHistoriesActions from "../../features/crud-pages/purchase-histories/store/actions";
import * as HomeActions from "../../features/home-page/store/actions";
import * as DetailMovieActions from '../../features/detail-pages/movie/store/actions';
import * as DetailSessionActions from '../../features/detail-pages/session/store/actions';
import * as DetailHallActions from '../../features/detail-pages/hall/store/actions';

export default {
    informationMessenger: InformationMessengerActions,
    sign: SignActions,
    tag: TagActions,
    role: RoleActions,
    status: StatusActions,
    genre: GenreActions,
    actor: ActorActions,
    hall: HallActions,
    movie: MovieActions,
    genreTag: GenresTagsActions,
    movieActor: MovieActorActions,
    movieGenre: MoviesGenresActions,
    movieTag: MovieTagActions,
    movieRating: MoviesRatingsActions,
    seat: SeatsActions,
    user: UsersActions,
    session: SessionsActions,
    ticket: TicketsActions,
    purchaseHistory: PurchaseHistoriesActions,
    home: HomeActions,
    detailMovie: DetailMovieActions,
    detailSession: DetailSessionActions,
    detailHall: DetailHallActions
}