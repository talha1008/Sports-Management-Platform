import { useLocation } from 'react-router-dom';
import useBuyMembership from '../../hooks/useBuyMembership';
import { useState, useEffect } from 'react';
import useGetClubById from '../../hooks/useGetClubById';
import Spinner from "../../components/Spinner";
import Navbar from "../../components/Navbar";

const CompletePayment = () => {
  const location = useLocation();
  const { payLoading, buy } = useBuyMembership();
  const [clubInfo, setClubInfo] = useState(null);
  const [paramsData, setParamsData] = useState({
    session_id: '',
    order_id: ''
  });
  const { loading, club } = useGetClubById();
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

    const data = await club(updatedData.order_id);
    setClubInfo(data);
  };

  useEffect(() => {
    getProduct();
  }, [location.search]);

  const buyMembership = async () => {
    const order_id = paramsData.order_id;
    const session_id = paramsData.session_id;
    const data = await buy({ order_id, session_id });
    setBuyData(data);
  }

  console.log(buyData);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[url('bg1.jpg')] bg-cover bg-center">
        <div className="w-[400px] mx-auto p-6 bg-white shadow-md rounded-lg mt-[80px] mb-4">
        <img src="logo.png" alt="logo" className='w-full h-[80px]' />

          {loading && !clubInfo && !paramsData ? (
            <Spinner />
          ) : !buyData ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Just One Step Behind</h2>
              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-lg font-medium mb-2">Membership Invoice</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Club ID:</span>
                    <span>{paramsData?.order_id || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Club:</span>
                    <span>{clubInfo?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sport:</span>
                    <span>{clubInfo?.sport || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Institute:</span>
                    <span>{clubInfo?.institute || 'N/A'}</span>
                  </div>

                  <div className="w-full h-px bg-gray-300 my-4"></div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Membership Fees (per month):</span>
                    <span className='font-semibold'>₹ {clubInfo?.fees || 'N/A'}</span>
                  </div>

                </div>
                <button
                  className={`mt-6 w-full bg-blue-500 text-white py-2 rounded-md ${payLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                  onClick={buyMembership}
                  disabled={payLoading}
                >
                  {payLoading ? <Spinner /> : 'Press to Confirm Membership'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4 mt-2">Membership Invoice</h2>
              <div className="border-t border-gray-300 pt-4">
                <div className="text-sm space-y-2">
                  <img src={buyData.image_url} alt={buyData.product_id} className='w-full max-h-[300px] mb-2' />

                  <div className='mb-2 flex flex-col gap-1'>
                    <span className='text-lg font-bold'>Club Details</span>
                    <div className='flex justify-between'>
                      <span className='font-semibold'>Product:</span>
                      <span> {buyData.name}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-semibold'>Sport:</span>
                      <span>{buyData.sport}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-semibold'>Institute:</span>
                      <span> {buyData.institute}</span>
                    </div>
                  </div>

                  <div className='mb-2 flex flex-col gap-1'>
                    <span className='text-lg font-bold'>Member Details</span>
                    <div className='flex justify-between'>
                      <span className='font-semibold'>Name:</span>
                      <span> {buyData.customer_name}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-semibold'>Email:</span>
                      <span>{buyData.customer_email}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-semibold'>Mobile No.:</span>
                      <span> {buyData.customer_mobile}</span>
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

export default CompletePayment