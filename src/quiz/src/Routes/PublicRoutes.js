import { ThreeDots } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

function PublicRoutes({ children, isAuth }) {
    if (isAuth === undefined) {
        return <ThreeDots height='80' width='80' radius='9' color='white' />;
    }

    return isAuth ? <Navigate to='/profile' replace /> : children;
}

export default PublicRoutes;
