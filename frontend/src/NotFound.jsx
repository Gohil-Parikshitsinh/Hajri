import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/dashboard')
    },5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen min-w-screen bg-[#f9f9f9] dark:bg-[#1e1e1e] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-[#2684FF]">404</h1>
      <p className="mt-4 text-xl text-[#555] dark:text-[#aaa]">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-[#888] dark:text-[#666]">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-5 py-2 bg-[#2684FF] text-white rounded-xl hover:bg-[#1e6fcb] transition"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
