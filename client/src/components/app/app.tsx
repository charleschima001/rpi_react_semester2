import { MainPage } from "../../pages/main-page/main-page";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { PrivateRoute } from "../private-route/private-route";
import { AppRoute } from "../../const";
import { JSX, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { checkAuthAction } from "../../store/api-actions";
import { ProfilePage } from '../../pages/profile-page/profile-page';


function App(): JSX.Element {
    const dispatch = useAppDispatch();
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

    useEffect(() => {
        dispatch(checkAuthAction());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Login} element={<LoginPage />} />
                <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
                <Route
                    path={AppRoute.Favorites}
                    element={
                        <PrivateRoute authorizationStatus={authorizationStatus}>
                            <FavoritesPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;