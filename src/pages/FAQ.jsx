import React from "react";
import { FaUser } from "react-icons/fa";
import FramerMotion from "./FramerMotion";
import SocialDelema from '../assets/social.jpg'

const QA = () => {
  return (
    <FramerMotion>
      <section className="text-gray-900 w-full mt-5">
        <div className="mx-auto w-full">
          <div className="w-full md:w-[80%] mx-auto md:px-4 mt-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center font-teko uppercase">
              Ask and Get Recommendations
            </h1>
            <div className="w-full mx-auto bg-gray-100 backdrop-blur-sm p-5 rounded-xl  overflow-hidden">
              {/* User 1 */}
              <FramerMotion>
                <div className="w-full flex flex-col md:flex-row items-start mb-8 rounded-md cursor-pointer hover:translate-x-2 duration-500">
                  <div className="flex justify-center items-center gap-2 text-md">
                    <FaUser className="text-md rounded-full" />
                    <p className="text-lg font-semibold">JohnDoe123</p>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 mb-2 text-sm md:text-md lg:text-lg">
                      Posted a request - 10 minutes ago
                    </p>
                    <p className="mb-4 text-sm md:text-md lg:text-lg">
                      I’m looking for a good documentary about technology
                      innovations in the last decade. Any suggestions?
                    </p>
                  </div>
                </div>
              </FramerMotion>
              {/* User 2 (Reply) */}
              <FramerMotion>
                <div className="ml-0 md:ml-8 w-full cursor-pointer hover:translate-x-2 duration-500 bg-gray-100 md:p-5 rounded-md">
                  <div className="flex flex-col md:flex-row items-start mb-8 w-full">
                    <div className="flex justify-center items-center gap-2 text-md">
                      <FaUser className="text-md rounded-full" />
                      <p className="text-lg font-semibold">TechGuru42</p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-600 mb-2 text-sm md:text-md lg:text-lg">
                        Replied to JohnDoe123 - 5 minutes ago
                      </p>
                      <img src={SocialDelema} alt="social" className="w-64 my-5 " />
                      <p className="mb-4 text-sm md:text-md lg:text-lg">
                        You should check out *The Social Dilemma* on Netflix!
                        It explores the impact of social media on society and
                        the tech innovations behind it.
                      </p>
                    </div>
                  </div>
                </div>
              </FramerMotion>
            </div>
          </div>
        </div>
      </section>
    </FramerMotion>
  );
};

export default QA;
