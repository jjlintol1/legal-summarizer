import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/reducers/user/user.selector";

export const useIsAuthenticated = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [currentUser]);

    return isAuthenticated;
}

export default useIsAuthenticated;