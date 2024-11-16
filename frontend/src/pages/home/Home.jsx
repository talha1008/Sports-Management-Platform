import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../context/AuthContext"

const Home = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="h-screen p-4 flex items-center justify-center bg-[url('bg1.jpg')] bg-cover bg-center">
            <Navbar />
            <span>{authUser.name}</span>
            <span>{authUser.role}</span>
        </div>
    )
}

export default Home