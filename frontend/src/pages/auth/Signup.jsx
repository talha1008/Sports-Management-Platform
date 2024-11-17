import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMiniEyeSlash } from 'react-icons/hi2';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		password: '',
		mobileNo: '',
		role: ''
	});
	const [secure, setSecure] = useState(true);
	const { loading, signup } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	}

	return (
		<div className="h-screen p-4 flex items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center">
			<div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
				<div className="relative flex w-1/2 shadow-xl border-4 border-r-0 border-green-700">
					<img src="bg2.png" alt="auth bg" className="w-full h-full object-cover opacity-70" />
					<div className="absolute inset-0 bg-black opacity-30"></div> {/* Black overlay */}
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<h1 className="text-white text-[50px] md:text-[45px] lg:text-[50px] xl:text-[60px] font-bold neon-text z-50 neon-green">Welcome</h1>
						<h1 className="text-white text-[100px] md:text-[80px] lg:text-[100px] xl:text-[100px] font-bold neon-text z-50 neon-green">Enigma</h1>
					</div>
				</div>

				{/* Form */}
				<div className="flex flex-col items-center justify-center p-5 w-1/2 shadow-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-4 border-l-0 border-green-700 rounded-r-lg">
					<h1 className="text-3xl font-bold text-green-500">Signup</h1>
					<div className="w-10 h-1 bg-green-800 mx-auto my-4 rounded-full mb-8"></div>
					<form className="w-full" onSubmit={handleSubmit}>
						<div className="space-y-4 w-full">
							<div className="flex items-center bg-green-200 rounded-lg w-full">
								<FaUser className="ml-4 text-gray-600 h-10" />
								<input type="text" placeholder="Enter your name" className="w-full h-[40px] p-4 bg-transparent border-0 focus:outline-none"
									value={inputs.name}
									onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
								/>
							</div>

							<div className="flex items-center bg-green-200 rounded-lg w-full">
								<MdEmail className="ml-4 text-gray-600 h-10" />
								<input type="email" placeholder="Enter your email" className="w-full h-[40px] p-4 bg-transparent border-0 focus:outline-none"
									value={inputs.email}
									onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
								/>
							</div>

							<div className="flex items-center bg-green-200 rounded-lg w-full">
								<RiLockPasswordFill className="ml-4 text-gray-600 h-10" />
								<input type={secure ? "password" : "text"} placeholder="Enter your password" className="w-full h-[40px] p-4 bg-transparent border-0 focus:outline-none"
									value={inputs.password}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
								/>
								<button
									onClick={(e) => {
										e.preventDefault();
										setSecure(!secure);
									}}
								>
									<HiMiniEyeSlash className="ml-4 text-gray-600 h-10 mr-4" />
								</button>
							</div>

							<div className="flex items-center bg-green-200 rounded-lg w-full">
								<FaPhone className="ml-4 text-gray-600 h-10" />
								<input type="text" placeholder="Enter your mobile number" className="w-full h-[40px] p-4 bg-transparent border-0 focus:outline-none"
									value={inputs.mobileNo}
									onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })}
								/>
							</div>

							<div className="flex justify-around text-gray-600">
								<label className="flex items-center">
									<input
										type="radio"
										name="seller_type"
										className="mr-2"
										value="Coach"
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
									/>
									Coach
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="seller_type"
										className="mr-2"
										value="Member"
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
									/>
									Member
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="seller_type"
										className="mr-2"
										value="Administrator"
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
									/>
									Administrator
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="seller_type"
										className="mr-2"
										value="Participant"
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
									/>
									Participant
								</label>
							</div>
						</div>

						<div className="flex flex-col items-center justify-center mt-5">
							<button className="w-full bg-green-700 text-white text-lg py-2 rounded-full hover:bg-green-500 transition-colors" disabled={loading}>
								Signup
							</button>

							<Link to="/login" className="text-gray-800 hover:underline hover:text-green-700 mt-1">
								Already have an Account? Login
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Signup