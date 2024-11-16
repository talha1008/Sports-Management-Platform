import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { MdHome, MdLogout, MdEmojiEvents } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const { loading, logout } = useLogout();

    const menuOptions = [
        {
            text: "Home",
            icon: <MdHome className="w-5 h-5" />,
            link: "",
        },
        {
            text: "Clubs & Events",
            icon: <MdEmojiEvents className="w-5 h-5" />,
            link: "/events",
        },
        {
            text: "Notice Board",
            icon: <GrAnnounce className="w-5 h-5" />,
            link: "/notice-board",
        },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src="logo.png" alt="Logo" className="w-[150px] h-10" />
                </div>
                <div className="hidden md:flex space-x-4 ml-4">
                    {menuOptions.map((item) => (
                        <a
                            key={item.text}
                            href={item.link}
                            className="text-gray-700 hover:text-blue-600 flex items-center space-x-3"
                        >
                            {item.icon}
                            <span>{item.text}</span>
                        </a>
                    ))}
                    <button
                        onClick={logout}
                        disabled={loading}
                        className="text-gray-700 hover:text-blue-600 flex items-center space-x-3"
                    >
                        <MdLogout className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
                <div className="md:hidden">
                    <HiOutlineBars3
                        onClick={() => setOpenMenu(true)}
                        className="w-8 h-8 text-gray-700 cursor-pointer"
                    />
                </div>
            </div>

            {openMenu && (
                <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-4">
                    <button
                        onClick={() => setOpenMenu(false)}
                        className="text-gray-700 mb-4"
                    >
                        <IoCloseSharp className="text-xl" />
                    </button>
                    <ul className="space-y-4">
                        {menuOptions.map((item) => (
                            <li key={item.text}>
                                <a
                                    href={item.link}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                                >
                                    {item.icon}
                                    <span>{item.text}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="mt-4 flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                        onClick={logout}
                        disabled={loading}
                    >
                        <MdLogout className="w-5 h-5" />
                        <span>Logout</span>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
