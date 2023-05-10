import "./App.scss";
import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/organism/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/context";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewsDetail from "./pages/NewsDetail";
import SubscriptionPage from "./pages/SubscriptionPage";
import { useSelector } from "react-redux";
import { RootState } from "./service/redux/Store";
import ManagePostsPage from "./pages/adminPages/ManagePostsPage";
import CreateNewPostPage from "./pages/adminPages/CreateNewPostPage";
import PaymentPage from "./pages/PaymentPage";
import { key } from "./helper/Cookie";

function App() {
  const userRole = useSelector((state: RootState) => state.role);
  const PrivateRoutes = () => {
    const { authenticated } = useContext(AuthContext);
    if (key) {
      return <Outlet />;
    }
    if (!authenticated) {
      return <Navigate to={"/login"} replace />;
    }
    return <Outlet />;
  };
  const PublicRoutes = () => {
    const { authenticated } = useContext(AuthContext);

    if (authenticated) {
      return <Navigate to={"/"} replace />;
    }
    return <Outlet />;
  };
  const AdminRoutes = () => {
    if (userRole.role !== "admin") {
      return <Navigate to={"/"} replace />;
    }
    return <Outlet />;
  };
  const UserRoutes = () => {
    if (userRole.role === "user") {
      return <Outlet />;
    }
    if (userRole.role !== "user") {
      return <Navigate to={"/admin"} replace />;
    }
    return <Outlet />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route element={<PrivateRoutes />}>
            <Route element={<UserRoutes />}>
              <Route index element={<LandingPage />} />
              <Route path="details">
                <Route path=":id" element={<NewsDetail />} />
              </Route>
              <Route path="subscribe" element={<SubscriptionPage />} />
              <Route path="payments">
                <Route path=":id" element={<PaymentPage />} />
              </Route>
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="admin">
                <Route index element={<ManagePostsPage />} />
                <Route path="create-post" element={<CreateNewPostPage />} />
              </Route>
            </Route>
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
