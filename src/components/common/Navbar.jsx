import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, signOut } = useAuth();

  const initials = useMemo(() => {
    if (!user?.displayName) return "U";
    return user.displayName
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [user]);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-indigo-600"
        >
          <path
            d="M20 6L9 17L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-lg font-semibold text-indigo-600">TaskFlow</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-8 h-8 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>
          )}
          <div className="text-sm text-gray-700">{user?.displayName || "User"}</div>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}
