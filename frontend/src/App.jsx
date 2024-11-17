import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Events from "./pages/events/Events";
import Registration from "./pages/registration/Registration";
import NoticeBoard from "./pages/notice-board/NoticeBoard";
import CompletePayment from "./pages/payments/CompletePayment";
import CancelPayment from "./pages/payments/CancelPayment";
import CompleteRegistration from "./pages/registration/CompleteRegistration";
import CancelRegistration from "./pages/registration/CancelRegistration";

function App() {
  const { authUser } = useAuthContext();
  console.log(authUser);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/events" element={authUser ? <Events /> : <Navigate to="/login" />} />
          <Route path="/register/:id" element={authUser ? <Registration /> : <Navigate to="/login" />} />
          <Route path="/notice-board" element={authUser ? <NoticeBoard /> : <Navigate to="/login" />} />
          <Route path="/complete-payment" element={authUser ? <CompletePayment /> : <Navigate to="/login" />} />
          <Route path="/cancel-payment" element={authUser ? <CancelPayment /> : <Navigate to="/login" />} />
          <Route path="/complete-registration" element={authUser ? <CompleteRegistration /> : <Navigate to="/login" />} />
          <Route path="/cancel-registration" element={authUser ? <CancelRegistration /> : <Navigate to="/login" />} />
        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App;
