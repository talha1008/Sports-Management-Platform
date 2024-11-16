/* eslint-disable react/prop-types */
import { MdSportsCricket } from "react-icons/md";
import { IoMdFootball } from "react-icons/io";

const EventCard = ({ club }) => {
	return (
		<div className="flex flex-col gap-2 items-center bg-green-500/30 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-green-500/20 hover:border-4">
			<img src="logo.png" alt="logo" className="w-[300px] h-[70px]" />
			<img src={club.img} alt={club.name} className="w-[250px] h-[220px] rounded-md" />

			<div className="flex flex-col gap-1 items-center justify-center">
				<span className="text-xl font-bold">{club.name}</span>
				<span className="text-lg font-semibold text-gray-700">{club.sport}</span>
				<span className="text-gray-600">{club.institute}</span>
				<span className="text-gray-600">Membership Fees: ₹{club.fees}</span>
			</div>

			<button className="flex items-center gap-2 rounded-md bg-green-700 hover:bg-green-500 text-white text-lg p-2 w-[90%] justify-center mt-2"><MdSportsCricket /> Become a Member <IoMdFootball /></button>
		</div>
	)
}

export default EventCard;
