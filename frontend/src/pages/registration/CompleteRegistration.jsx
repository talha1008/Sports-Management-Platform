import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import Spinner from "../../components/Spinner";
import Navbar from "../../components/Navbar";
import useGetEventById from '../../hooks/useGetEventById';
import useConfirmRegistration from '../../hooks/useConfirmRegistration';

const CompleteRegistration = () => {
	const location = useLocation();
	const [eventInfo, setEventInfo] = useState(null);
	const [paramsData, setParamsData] = useState({
		session_id: '',
		order_id: ''
	});
	const { loading, event } = useGetEventById();
	const { payLoading, register } = useConfirmRegistration();
	const [buyData, setBuyData] = useState();

	const getProduct = async () => {
		const queryParams = new URLSearchParams(location.search);
		const session_id = queryParams.get('session_id');
		const order_id = queryParams.get('order_id');

		const updatedData = {
			session_id: session_id,
			order_id: order_id
		}
		setParamsData(updatedData);

		const data = await event(updatedData.order_id);
		setEventInfo(data);
	};

	useEffect(() => {
		getProduct();
	}, [location.search]);

	const buyMembership = async () => {
		const order_id = paramsData.order_id;
		const session_id = paramsData.session_id;
		const data = await register({ order_id, session_id });
		setBuyData(data);
	}

	console.log(buyData);

	return (
		<>
			<Navbar />
			<div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[url('bg1.jpg')] bg-cover bg-center">
				<div className="w-[400px] mx-auto p-6 bg-white shadow-md rounded-lg mt-[80px] mb-4">
					<img src="logo.png" alt="logo" className='w-full h-[80px]' />

					{loading && !eventInfo && !paramsData && !buyData ? (
						{/*<Spinner />*/ }
					) : !buyData ? (
						<>
							<h2 className="text-xl font-semibold mb-4">Just One Step Behind</h2>
							<div className="border-t border-gray-300 pt-4">
								<h3 className="text-lg font-medium mb-2">Registration Invoice</h3>
								<div className="text-sm space-y-2">
									<div className="flex justify-between">
										<span className="font-semibold">Club ID:</span>
										<span>{paramsData?.order_id || 'N/A'}</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold">Event:</span>
										<span>{eventInfo?.name || 'N/A'}</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold">Club:</span>
										<span>{eventInfo?.club || 'N/A'}</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold">Details:</span>
										<span>{eventInfo?.desc || 'N/A'}</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold">Institute:</span>
										<span>{eventInfo?.institute || 'N/A'}</span>
									</div>

									<div className="w-full h-px bg-gray-300 my-4"></div>

									<div className="flex justify-between">
										<span className="font-semibold">Registration Fees:</span>
										<span className='font-semibold'>₹ {eventInfo?.fees || 'N/A'}</span>
									</div>

								</div>
								<button
									className={`mt-6 w-full bg-blue-500 text-white py-2 rounded-md ${payLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
									onClick={buyMembership}
									disabled={payLoading}
								>
									{payLoading ? "Loading..." : 'Press to Confirm Registration'}
								</button>
							</div>
						</>
					) : (
						<>
							<h2 className="text-xl font-semibold mb-4 mt-2">Registration Invoice</h2>
							<div className="border-t border-gray-300 pt-4">
								<div className="text-sm space-y-2">
									<img src={buyData.image_url} alt={buyData.product_id} className='w-full max-h-[300px] mb-2' />

									<div className='mb-2 flex flex-col gap-1'>
										<span className='text-lg font-bold'>Event Details</span>
										<div className='flex justify-between'>
											<span className='font-semibold'>Event:</span>
											<span> {buyData.name}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Club:</span>
											<span>{buyData.club}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Details:</span>
											<span>{buyData.desc}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Institute:</span>
											<span> {buyData.institute}</span>
										</div>
									</div>

									<div className='mb-2 flex flex-col gap-1'>
										<span className='text-lg font-bold'>Member Details</span>
										<div className='flex justify-between'>
											<span className='font-semibold'>Team Lead:</span>
											<span> {buyData.team_lead_name}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Team Lead Email:</span>
											<span>{buyData.customer_email}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Team Lead Mobile No.:</span>
											<span>{buyData.team_lead_phone}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Team Lead Institute:</span>
											<span>{buyData.lead_institute}</span>
										</div>
										<span className='font-semibold'>Other Members:</span>
										<div>
											{buyData.members.map((member, _idx) => (
												<div className='flex justify-between' key={_idx}>
													<span>Member {_idx+1}:</span>
													<span>{member.name}</span>
												</div>
											))}
										</div>
									</div>

									<div className="w-full h-px bg-gray-300 my-4"></div>

									<div className="flex justify-between text-lg">
										<span className="font-semibold">Total:</span>
										<span className="font-semibold">₹ {buyData.amount}</span>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default CompleteRegistration