import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("role");

    if (token) {
        return rol === "organizador"
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/juegos" replace />;
    }

    return children;
};

export default PublicRoute;