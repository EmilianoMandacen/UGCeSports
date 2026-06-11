import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(rol)) {
        return <Navigate to="/juegos" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;