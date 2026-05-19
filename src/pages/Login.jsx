import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";

export default function Login() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
      // onAuthStateChanged in AuthContext will pick up the user
      // and navigate will trigger via the useEffect above
    } catch (error) {
      setAuthError({
        message: "Sign-in failed. Please try again.",
        details: error?.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <Loader message="Authenticating..." />;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <section className="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-violet-700 text-white px-12 py-14 relative overflow-hidden">
        <div>
          <p className="text-indigo-200 text-sm uppercase tracking-[0.2em]">TaskFlow</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight">
            Manage your tasks with clarity
          </h1>
          <p className="mt-4 text-indigo-200 text-lg">
            Stay focused, organized, and in control of your work.
          </p>
          <div className="mt-8 space-y-4 text-sm text-indigo-100">
            {[
              "Create and organize tasks instantly",
              "Track progress across three clear stages",
              "Access your workspace from anywhere",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 self-start">
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-sm text-white w-72 animate-float">
            <div className="flex items-center justify-between gap-3">
              <span className="leading-snug">Design new landing page</span>
              <span className="shrink-0 text-xs bg-amber-400/20 text-amber-100 px-2 py-0.5 rounded-full">
                In Progress
              </span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-sm text-white w-72 animate-float-delayed">
            <div className="flex items-center justify-between gap-3">
              <span className="leading-snug">Review pull requests</span>
              <span className="shrink-0 text-xs bg-emerald-400/20 text-emerald-100 px-2 py-0.5 rounded-full">
                Complete
              </span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-sm text-white w-72">
            <div className="flex items-center justify-between gap-3">
              <span className="leading-snug">Write API documentation</span>
              <span className="shrink-0 text-xs bg-sky-400/20 text-sky-100 px-2 py-0.5 rounded-full">
                Planned
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 text-indigo-600">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl font-bold text-gray-900">TaskFlow</span>
          </div>

          <h2 className="mt-10 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-500">Sign in to your account to continue</p>

          <button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            className="mt-8 border border-gray-300 rounded-lg px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition shadow-sm w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium text-gray-700">Signing in...</span>
              </div>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.02 32.737 28.815 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.938 3.043l5.657-5.657C34.047 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 16.108 18.991 12 24 12c3.059 0 5.842 1.154 7.938 3.043l5.657-5.657C34.047 6.053 29.268 4 24 4c-7.682 0-14.318 4.26-17.694 10.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.211 35.091 26.715 36 24 36c-4.798 0-8.994-3.246-10.303-7.651l-6.522 5.025C10.505 39.556 16.772 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.1 2.948-3.47 5.401-6.585 6.565l6.191 5.238C36.925 37.834 44 32.5 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
              </>
            )}
          </button>

          {authError && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p>{authError.message}</p>
              <p className="text-xs text-red-500 mt-1">{authError.details}</p>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center mt-8">
            By signing in, you agree to our Terms of Service and Privacy Policy.
            <br />
            New users are automatically registered on first sign-in.
          </p>
        </div>
      </section>
    </div>
  );
}
