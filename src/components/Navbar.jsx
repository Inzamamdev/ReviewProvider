import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/getUser";
import toast from "react-hot-toast";
import { auth } from "../Store/realtimeDB";

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [uid, setId] = useState(useAuth().id)
  const { id, userData } = useAuth();


  useEffect(() => {
    if (id && pathname != '/login' && pathname != '/signup') {
      console.log(id)
      setId(id)
    }
  }, [pathname])

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("User Logedout Successfully!!", {
        duration: 2000,
        position: "top-center",
      });
      setId(null);
      navigate("/login");
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
        position: "bottom-center",
      });
    }
  };

  if (pathname && pathname != '/login' && pathname != '/signup')
    return (
      <nav className="w-full py-2 bg-blue-200 h-max flex justify-between">
        <Link to={"/home"}>
          <div className="flex justify-around w-max gap-x-3 items-center px-4">
            <img width={50} height={50} className="rounded-full border-2" />
            <p className="text-blue-800 text-xl font-bold ">Testimonals</p>
          </div>
        </Link>
        <div className="flex justify-evenly items-center px-4 gap-x-4">
          {uid ? (
            <>
              <div>
                {userData ? (
                  <p className="text-black font-extrabold text-2xl drop-shadow-sm">
                    {(userData.fname).charAt(0).toUpperCase()+(userData.fname).slice(1)}
                  </p>
                ) : (
                  console.log("UserData Loading...")
                )}
              </div>
              <button
                className="flex items-center gap-x-2 border border-1 shadow-md border-red-500 h-max px-3 py-1.5 rounded-3xl text-white font-mono font-bold text-md bg-red-500 hover:bg-red-100 hover:text-slate-900"
                onClick={() => handleLogout()}
              >
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              {pathname != "/signup" && (
                <button
                  className="border-2 border-blue-800 min-w-32 h-max p-3 rounded-3xl text-white font-mono font-bold text-md bg-blue-800 hover:bg-blue-100 hover:text-slate-900"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              )}
              {pathname != "/login" && (
                <button
                  className="border-2 border-blue-600 min-w-32 h-max p-3 rounded-3xl text-white font-mono font-bold text-md bg-blue-600 hover:bg-blue-100 hover:text-slate-900"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    );
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
    </AuthProvider>
  );
}
