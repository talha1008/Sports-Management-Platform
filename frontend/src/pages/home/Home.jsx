import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="h-screen p-4 flex items-center justify-center bg-[url('bg1.jpg')] bg-cover bg-center">
            <Navbar />
            
            <div className="flex items-center justify-around w-full p-4">
                <div className="flex flex-col">
                    <span className="lg:text-[65px] md:text-[45px] font-bold text-green-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.75)]">Welcome</span>
                    <span className="lg:text-[85px] md:text-[60px] font-bold drop-shadow-[0_2px_3px_rgba(0,0,0,0.75)]">{authUser.name}</span>
                </div>
                <img src="master.png" alt="master bg" className="lg:w-[700px] md:w-[500px]" />
            </div>
        </div>
    )
}

export default Home