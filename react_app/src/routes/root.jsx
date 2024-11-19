import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Root() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/login")
    }, []);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}