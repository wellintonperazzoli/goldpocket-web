import { useNavigate } from "react-router-dom";

export default function BackButton(props) {
    let navigate = useNavigate();

    async function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <a href="/back" onClick={goBack}>
            {
                props.children === undefined ? 
                    "Back" :
                    props.children
            }
        </a>
    )
}