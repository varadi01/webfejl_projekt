import {useNavigate} from "react-router-dom";

export default function Root() {
    const navigate = useNavigate()



    return (
        <div>
            root
            {navigate("/login")}
        </div>

    )
}