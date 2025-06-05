import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to your Dashboard
                </h1>
                <p className="mb-6">You're logged in. 🎉</p>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
