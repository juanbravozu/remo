import { Redirect, Route } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest}:any) => {
    
    const { currentUser } = useAuth()!;

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
            }}
            >

        </Route>
    )
}

export default PrivateRoute;