import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Loader from './Loader';
import { ToastContainer } from 'react-toastify';
import { getRefreshTokenAPi } from './API/getRefreshTokenAPi';
import { getRememberMe } from './Constant';
import ResetPassword from './pages/Forgetpassword';
import Forgetmailmodel from './pages/Forgetmailmodel';
import Agencies from './components_Dash/Users/Agencies/Agencies';

// Lazy load components

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const About = lazy(() => import('./pages/About'));
const Program = lazy(() => import('./pages/Program'));
const Apply = lazy(() => import('./pages/Apply'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Layout = lazy(() => import('./components_Dash/Layout/Layout'));
const Dashboard = lazy(() => import('./components_Dash/Dashboard/Dashboard'));
const UserDetails = lazy(() => import('./components_Dash/Users/UserDetails'));
const ProfileDetails = lazy(() => import('./components_Dash/Profile/Profile'));
const University = lazy(() => import('./components_Dash/Users/University/University'));
const CourseDetails = lazy(() => import('./components_Dash/Course/CourseTab'));
const CourseDetailPage = lazy(() => import('./components_Dash/Course/CourseDetailPage '));
const Userstudents = lazy(() => import('./components_Dash/Users/Students/Userstudents'));

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  // useEffect(() => {
  //   let intervalId = null;

  //   const refreshToken = async () => {
  //     const publicRoutes = [
  //       "/login",
  //       "/register/email-verification",
  //       "/account/email/reset-password/",
  //       "/forgetemail",
  //       "/reset-password"
  //     ];

  //     if (publicRoutes.some(route => window.location.pathname.startsWith(route))) {
  //       return;
  //     }

  //     const accessToken = localStorage.getItem("access_token");
  //     const refreshTokenValue = localStorage.getItem("refresh_token");
  //     const rememberMe = getRememberMe();

  //     if (!accessToken) {
  //       if (window.location.pathname !== "/login") navigate("/login");
  //       return;
  //     }

  //     if (!rememberMe) {
  //       if (window.location.pathname !== "/login") navigate("/login");
  //       return;
  //     }

  //     if (!refreshTokenValue) {
  //       if (window.location.pathname !== "/login") navigate("/login");
  //       return;
  //     }

  //     setIsRefreshingToken(true);
  //     try {
  //       await getRefreshTokenAPi();
  //     } catch (error) {
  //       console.error("Token refresh failed:", error);
  //       localStorage.removeItem("access_token");
  //       localStorage.removeItem("refresh_token");
  //       if (window.location.pathname !== "/login") navigate("/login");
  //     } finally {
  //       setIsRefreshingToken(false);
  //     }
  //   };

  //   refreshToken();

  //   if (getRememberMe()) {
  //     intervalId = setInterval(refreshToken, 30 * 60 * 1000);
  //   }

  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, []);

  return (
    <>
      {/* <RouteChangeHandler setLoading={setLoading} />
      {(loading || isRefreshingToken) && <Loader />} */}
      <MainContent />
    </>
  );
}

function MainContent() {
  const location = useLocation();
  const hideNavFooter = location.pathname.startsWith('/dashboard') || location.pathname === '/course-details';

  return (
    <div className="App">
      {!hideNavFooter && <Navbar />}
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/program" element={<Program />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register/email-verification" element={<Signup />} />
          <Route path="/forgetemail" element={<Forgetmailmodel />} />
          <Route path="/course-details" element={<CourseDetailPage />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="user-types" element={<UserDetails />} />
            <Route path="university" element={<University />} />
            <Route path='courses' element={<CourseDetails />} />
            <Route path="agencies" element={<Agencies />} />
            <Route path="students" element={<Userstudents />} />
            <Route path="notice" element={<ComingSoon title="Notice Board" />} />
            <Route path="fees-management" element={<ComingSoon title="Fees Management" />} />
            <Route path="setting" element={<ComingSoon title="Settings" />} />
            <Route path="profile" element={<ProfileDetails />} />
            <Route path="help" element={<ComingSoon title="Help & Support" />} />
            <Route path="logout" element={<ComingSoon title="Logout" />} />
          </Route>
        </Routes>
      </Suspense>
      {!hideNavFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">This functionality is coming soon...</p>
      </div>
    </div>
  );
}

// function RouteChangeHandler({ setLoading }: { setLoading: (loading: boolean) => void }) {
//   const location = useLocation();

//   useEffect(() => {
//     setLoading(true);
//     const timeout = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timeout);
//   }, [location, setLoading]);

//   return null;
// }

const Footer = lazy(() => import('./components/Footer'));

export default AppWrapper;