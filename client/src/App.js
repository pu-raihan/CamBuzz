import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftbar/LeftBar";
import VerifyMail from "./pages/VerifyMail/VerifyMail";
import "./style.scss";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Resources from "./components/resources/Resources";
import Details from "./components/details/Details";
import Menubar from "./components/menubar/Menubar";
import Chats from "./components/chat/Chats";
import Requests from "./pages/requests/Requests";
import Events from "./pages/events/Events";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 7 }}>
              <Outlet />
            </div>
            <div className="rightbar">
            <Chats />
            </div>
          </div>
          <Menubar />
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    else if (!currentUser.emailVerified) {
      return <Navigate to="/verifyemail" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/resources",
          element: <Resources />,
        },
        {
          path: "/resources/:resource",
          element: <Details />,
        },
        {
          path: "/chats",
          element: <Chats />,
        },
        {
          path: "/requests",
          element: <Requests />,
        },
        {
          path: "/events",
          element: <Events />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element:(<QueryClientProvider client={queryClient}> <Register /></QueryClientProvider>),
    },
    {
      path: "/verifyemail",
      element: <VerifyMail/>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
