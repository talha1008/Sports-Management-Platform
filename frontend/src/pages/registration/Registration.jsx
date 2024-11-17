import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from 'react-router-dom';
import useGetEventById from "../../hooks/useGetEventById";
import useHandleRegistration from "../../hooks/useHandleRegistration";
import Spinner from "../../components/Spinner";

const Registration = () => {
	const [eventData, setEventData] = useState();
	const { loading, event } = useGetEventById();
	const { payLoding, handleRegistration } = useHandleRegistration();
	const { id } = useParams();
	const [inputs, setInputs] = useState({
		teamName: "",
		teamLeadName: "",
		teamLeadPhone: "",
		instituteName: "",
		members: [{ name: "", phone: "" }]
	});

	const getEvent = async () => {
		const data = await event(id);
		setEventData(data);
	}

	useEffect(() => {
		getEvent();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputs((prevInputs) => ({
			...prevInputs,
			[name]: value,
		}));
	};

	const addMember = () => {
		if (inputs.members.length < 10) {
			setInputs((prevInputs) => ({
				...prevInputs,
				members: [...prevInputs.members, { name: "", phone: "" }]
			}));
		}
	}

	const handleMemberChange = (index, field, value) => {
		const updatedMembers = [...inputs.members];
		updatedMembers[index][field] = value;
		setInputs((prevInputs) => ({
			...prevInputs,
			members: updatedMembers
		}));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const registrationData = {
			...eventData,
			team_name: inputs.teamName,
			team_lead_name: inputs.teamLeadName,
			team_lead_phone: inputs.teamLeadPhone,
			lead_institute: inputs.instituteName,
			members: inputs.members,
		};
		const response = await handleRegistration(registrationData);

		if (response.url) {
			window.location.href = response.url;
		}
	}

	return (
		<>
			<Navbar />
			<div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center">
				<div className="flex gap-6 p-3 w-full items-center justify-around mt-10">
					{/* Card */}
					{loading ? (
						<Spinner />
					) : (
						<div className="flex flex-col gap-2 items-center bg-green-500/30 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-green-500/20 hover:border-4">
							<img src="/logo.png" alt="logo" className="w-[300px] h-[70px]" />
							<img src={eventData?.img} alt={eventData?.id} className="w-[250px] h-[220px] rounded-md" />

							<div className="flex flex-col gap-1 items-center justify-center">
								<span className="text-lg font-semibold text-gray-700">{eventData?.club} presents</span>
								<span className="text-xl font-bold">{eventData?.name}</span>
								<span className="text-lg font-semibold text-gray-700">{eventData?.desc}</span>
								<span className="text-gray-600">{eventData?.price_pool}</span>
								<span className="text-gray-600">Registration Fees: ₹{eventData?.fees}</span>
							</div>
						</div>
					)}

					{/* Registration Form */}
					<form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
						<h2 className="text-2xl font-bold mb-4">Team Registration</h2>

						<div className="mb-4">
							<label className="block text-gray-700 font-semibold mb-2">Team Name</label>
							<input
								type="text"
								name="teamName"
								value={inputs.teamName}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border rounded-md"
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 font-semibold mb-2">Team Lead Name</label>
							<input
								type="text"
								name="teamLeadName"
								value={inputs.teamLeadName}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border rounded-md"
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 font-semibold mb-2">Team Lead Phone Number</label>
							<input
								type="text"
								name="teamLeadPhone"
								value={inputs.teamLeadPhone}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border rounded-md"
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 font-semibold mb-2">Institute Name</label>
							<input
								type="text"
								name="instituteName"
								value={inputs.instituteName}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border rounded-md"
								required
							/>
						</div>

						{/* Member Details */}
						<div className="mb-4">
							<h3 className="text-lg font-semibold mb-2">Team Members</h3>
							{inputs.members.map((member, index) => (
								<div key={index} className="flex gap-4 mb-2">
									<input
										type="text"
										placeholder="Member Name"
										value={member.name}
										onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
										className="w-1/2 px-3 py-2 border rounded-md"
										required
									/>
									<input
										type="text"
										placeholder="Member Phone"
										value={member.phone}
										onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
										className="w-1/2 px-3 py-2 border rounded-md"
										required
									/>
								</div>
							))}
							{inputs.members.length < 10 && (
								<button
									type="button"
									onClick={addMember}
									className="text-green-500 font-semibold mt-2"
								>
									+ Add Member
								</button>
							)}
						</div>

						<button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md font-semibold" disabled={payLoding}>
							Register
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Registration;
