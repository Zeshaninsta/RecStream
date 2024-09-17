import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const [quotes, setQuotes] = useState([
    "“Movies can and do have tremendous influence in shaping young lives.” - Walt Disney",
    "“A good film is when the price of the dinner, the theatre admission and the babysitter were worth it.” - Alfred Hitchcock",
    "“The best way to predict the future is to create it.” - Peter Drucker",
  ]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className=" text-gray-900 py-8 mt-10 border-t border-slate-700">
      <div className="mx-auto flex flex-col justify-between items-center px-12">
        <div className="p-4 rounded-md">
          {quotes[currentQuoteIndex] && (
            <p className="text-sm md:text-base font-rubik h-[80px] md:h-auto">
              {quotes[currentQuoteIndex]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-5 md:flex-row justify-between items-center w-full px-12 mt-10">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <h1 className="font-rubik font-bold text-xs lg:text-sm text-gray-900 p-2 rounded-md cursor-pointer hover:bg-white hover:text-[#06131a] duration-500">
              RecStream
              </h1>
            </div>
          </div>
          {/* Navigation links */}
          <div className="hidden md:flex justify-evenly items-center gap-5 text-white/90 font-rubik rounded-xl p-2 text-sm border border-slate-700 m-auto">
            <Link to="/">
              <li className="flex justify-center items-center gap-2 cursor-pointer text-gray-700 hover:text-black p-2 rounded-lg duration-500 list-none">
                <IoHome />
                Home
              </li>
            </Link>
            <Link to="/browse">
              <li className="flex justify-center items-center gap-2 cursor-pointer text-gray-700 hover:text-black p-2 rounded-lg duration-500 list-none">
                <RiQuestionAnswerFill />
                Browse
              </li>
            </Link>
            <Link to="/bookmarks">
              <li className="flex justify-center items-center gap-2 cursor-pointer text-gray-700 hover:text-black p-2 rounded-lg duration-500 list-none">
                <FaRegBookmark />
                Bookmarks
              </li>
            </Link>
            <Link to="/dashboard">
              <li className="flex justify-center items-center gap-2 cursor-pointer text-gray-700 hover:text-black p-2 rounded-lg duration-500 list-none">
                <RxDashboard />
                Dashboard
              </li>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/recstream"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-gray-400 hover:text-gray-300 transition duration-300" />
            </a>
            <a
              href="https://twitter.com/recstream"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-400 hover:text-gray-300 transition duration-300" />
            </a>
            <a
              href="https://linkedin.com/company/recstream"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-gray-400 hover:text-gray-300 transition duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
