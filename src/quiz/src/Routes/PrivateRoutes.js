import { ThreeDots } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

function PrivatePoutes({ children, isAuth }) {
    if (isAuth === undefined) {
        return <ThreeDots height='80' width='80' radius='9' color='white' />;
    }

    return isAuth ? children : <Navigate to='/login' replace />;
}

export default PrivatePoutes;
