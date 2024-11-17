import { useState } from "react";
import toast from "react-hot-toast";

const useGetEvents = () => {
    const [enLoading, setEnLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;

    const events = async () => {
        setEnLoading(true);
        try {
            const res = await fetch(`${apiUrl}/events/get-events`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setEnLoading(false);
        }
    }
    return { enLoading, events }
}

export default useGetEvents;