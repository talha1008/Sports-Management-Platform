import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const login = async ({ email, password, forgotPasswordMode = false }) => {
        const success = handleInputErrors({ email, password, forgotPasswordMode });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("SM-user", JSON.stringify(data));
            setAuthUser(data);
            if (data) {
                toast.success("Logged in Successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    };
    return { loading, login };
};

export default useLogin;

function handleInputErrors({ email, password, forgotPasswordMode }) {
    if (forgotPasswordMode === false) {
        if (!email || !password) {
            toast.error("Please fill all the fields");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password should be at least 6 characters long");
            return false;
        }
    } else {
        if (!email) {
            return false;
        }
    }
    return true;
}
