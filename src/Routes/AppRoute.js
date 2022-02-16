import { useParams } from "react-router-dom";
import PrivateLayout from "../Components/Layout/PrivateLayout"
import SideMenu from "../Components/Layout/SideMenu";


export default function AppRoute(props) {
    const params = useParams();
    return !props.public ? (
        <PrivateLayout>
            <SideMenu />
            <props.element params={params} />
        </PrivateLayout>
    ) : (
        <props.element params={params} />
    )
}