import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";
import "./styles/forms.css";
import "./styles/modals.css";
import "./styles/navBar.css";
import "./styles/juego.css";
import "./styles/categorias.css";
import "./styles/torneo.css";
import "./styles/equipo.css";
import "./styles/plan.css";
import "./styles/dashboard.css";

import PublicRoute from "./Components/PublicRoute";

import ContainerPage from './Components/ContainerPage';
import CategoriaPage from './Components/CategoriaPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import NotPage from './Components/NotPage';
import TorneosPage from './Components/TorneosPage';
import JuegosPage from './Components/JuegosPage';
import Dashboard from './Components/dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Equipo from './Components/Equipo';
import MisTorneos from './Components/MisTorneosPage';

import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import "react-toastify/dist/ReactToastify.css";

const App = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ContainerPage />}>

<Route
    index
    element={
        <PublicRoute>
            <LoginPage />
        </PublicRoute>
    }
/>

<Route
    path="login"
    element={
        <PublicRoute>
            <LoginPage />
        </PublicRoute>
    }
/>

                        <Route path="register" element={<RegisterPage />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="juegos" element={<JuegosPage />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={["organizador"]} />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="categorias" element={<CategoriaPage />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={["jugador"]} />}>
                            <Route path="torneos" element={<TorneosPage />} />
                            <Route path="equipo" element={<Equipo />} />
                        </Route>

                        <Route path="*" element={<NotPage />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;