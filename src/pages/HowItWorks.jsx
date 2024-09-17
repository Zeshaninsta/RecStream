import React from "react";
import FAQ from "./FAQ";
import FramerMotion from "./FramerMotion";
import PageTransition from "./PageTransition";

const HowItWorks = () => {
  return (
    <PageTransition>
      <FramerMotion>
        <section className="bg-gray-100 w-full md:w-[90%] mx-auto text-gray-900 py-5  rounded-xl  cursor-pointer">
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto px-4 leading-normal">
              <h1 className="text-4xl md:text-6xl font-bold mb-5 md:mb-8 text-center font-teko uppercase">
                How RecStream Works
              </h1>
              <p className="text-lg md:text-xl md:mb-12 text-center font-rubik">
                Discover how RecStream makes it easy for users to share and get media recommendations based on their interests:
              </p>
              {/* Steps grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                {/* Step 1 */}
                <FramerMotion>
                  <div className="relative rounded-lg md:h-[300px]">
                    <div className="z-20 flex flex-col items-center justify-center bg-transparent backdrop-blur-md rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500 h-full border border-green-500">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-teko">
                        Create an Account
                      </h2>
                      <p className="text-sm md:text-base text-center font-jet">
                        Sign up for a RecStream account to start posting your requests or responding to others. 
                      </p>
                    </div>
                  </div>
                </FramerMotion>
                {/* Step 2 */}
                <FramerMotion>
                  <div className="relative rounded-lg md:h-[300px]">
                    <div className="flex flex-col items-center justify-center z-20 backdrop-blur-md rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500 h-full border border-blue-500">
                      <h2 className="text-xl md:text-2xl font-bold text-center font-teko">
                        Post a Recommendation Request
                      </h2>
                      <p className="text-sm md:text-base text-center font-jet">
                        Post a request for media recommendations (movies, shows, YouTube, etc.) in any category. It's easy, and the community will respond with their suggestions!
                      </p>
                    </div>
                  </div>
                </FramerMotion>
                {/* Step 3 */}
                <FramerMotion>
                  <div className="relative rounded-lg md:h-[300px]">
                    <div className="flex flex-col items-center justify-center z-30 backdrop-blur-md h-full rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500 border border-yellow-500">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-teko">
                        Share Your Recommendations
                      </h2>
                      <p className="text-sm md:text-base text-center font-jet">
                        Provide your own recommendations based on your personal experiences and knowledge. Help others discover new media!
                      </p>
                    </div>
                  </div>
                </FramerMotion>
                {/* Step 4 */}
                <FramerMotion>
                  <div className="relative rounded-lg md:h-[300px]">
                    <div className="flex flex-col items-center justify-center z-20 h-full backdrop-blur-md rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 duration-500 border border-purple-500">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-teko">
                        Browse and Engage
                      </h2>
                      <p className="text-sm md:text-base text-center font-jet">
                        Browse through various categories and interact with the community by commenting, liking, or replying to posts.
                      </p>
                    </div>
                  </div>
                </FramerMotion>
              </div>
            </div>
          </div>
        </section>
      </FramerMotion>
    </PageTransition>
  );
};

export default HowItWorks;
