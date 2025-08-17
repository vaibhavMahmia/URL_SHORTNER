import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";
import { Calendar, RefreshCw, UserCog, LogOut, Loader2} from "lucide-react";
import { logoutThunkAction } from "../store/reducers/auth_reducer";

export const Profile: React.FC = () => {
  const { user, loading } = useAppSelector((state) => state.URIShortner);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-full max-w-3xl border border-white/20">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center text-3xl font-bold text-white shadow-md">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <a
              href={`mailto:${user?.email}`}
              className="text-blue-300 text-sm underline hover:text-blue-400"
            >
              {user?.email}
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/20 mb-6" />

        {/* Profile Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90">
          <div className="flex items-start gap-2">
            <Calendar className="w-5 h-5 text-yellow-300 mt-1" />
            <div>
              <p className="font-semibold">Member since:</p>
              <p>{user?.createdAt ? formatDate(user.createdAt) : "-"}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <RefreshCw className="w-5 h-5 text-orange-400 mt-1" />
            <div>
              <p className="font-semibold">Last profile update:</p>
              <p>{user?.updatedAt ? formatDate(user.updatedAt) : "-"}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center sm:justify-end gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition">
            <UserCog className="w-4 h-4" />
            Edit Profile
          </button>
          <button
            onClick={() => dispatch(logoutThunkAction())}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};
