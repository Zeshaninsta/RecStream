import React, { useState, useEffect } from "react";
import HowItWorks from "./HowItWorks";
import Community from "./Community";
import FAQ from "./FAQ";
import Button from "../components/Button";
import Testimonials from "./Testimonial";
import CTA from "./CTA";
import Developers from "./Developers";
import Collaborate from "./Collaborate";
import { Link } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import "./Home.css";
import FramerMotion from "./FramerMotion";
import PageTransition from "./PageTransition";
import Explore from '../components/Explore.json'
import ShowPost from './showPost'
import GridLines from "react-gridlines";
const HeroSection = () => {
  const background = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-yellow-500",
    "bg-orange-500",
];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section
      className=" text-gray-900 min-h-screen w-full z-20 relative"
      id="Home"
    >
      {isScrolled && (
        <div className="text-4xl text-gray-900 fixed bottom-5 right-10 border border-slate-700 rounded-full cursor-pointer p-2 z-50 hover:bg-black hover:text-white focus:border-blue-500 hover:border-none">
          <a href="#Home" className="transition-all duration-500 ">
            <IoIosArrowUp />
          </a>
        </div>
      )}
      <FramerMotion>
          <div className=" mx-auto flex flex-col items-center justify-center mb-10 md:h-screen bg-transparent backdrop:blur-m rounded-lg relative p-2">
            {/* Background staring point*/}
            {/* end */}
            <div className="w-full flex flex-col justify-center items-center z-30 relative  ">
              <h1 className="text-4xl md:text-8xl font-bold md:mb-4 font-rubik cursor-pointer py-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
                  RecStream
                </span>
              </h1>

              <p className="text-sm md:text-md text-center mb-4 font-rubik md:w-[70%] text-gray-800 m-auto py-2 md:mt-1">
              RecStream provides an engaging and user-friendly experience for discovering and sharing media content. Connect with fellow enthusiasts, explore diverse recommendations, and enjoy seamless interactions with your favorite movies and shows.
              </p>
            </div>
            <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto w-full'>
                {Explore.map((cate, index) => (
                    <div key={index} className="relative grid grid-cols-3 bg-gray-200 gap-5 rounded-md shadow-md overflow-hidden p-6">
                        <div className={`absolute -top-20 -left-5 w-32 h-32 ${background[index % background.length]} rotate-45 z-10`}></div>
                        <div className='col-span-2 z-50 h-full flex flex-col justify-between items-start p-2'>
                            <h1 className='text-gray-900 text-3xl font-poppins font-semibold cursor-pointer'>{cate.title}</h1>
                            <p className='text-gray-500 font-poppins font-normal'>{cate.description}</p>
                            <h4 className="text-gray-900 cursor-pointer text-md ">{cate.link}</h4>
                        </div>
                        <div className='group relative'>
                            <div className='absolute top-0 left-0 w-full h-full bg-gray-500 z-10 group-hover:rotate-12 ease-in-out duration-300 rounded-lg'></div>
                            <img
                                src={cate.image}
                                alt='images'
                                className='z-50 object-fit rounded-lg relative w-full h-full cursor-pointer'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
          </div>
      </FramerMotion>
      <ShowPost />
      {/* <HowItWorks />
      <FAQ /> */}
      {/* <Community />
      <Testimonials />
      <CTA />
      <Developers />
      <Collaborate /> */}
    </section>
  );
};

export default HeroSection;
