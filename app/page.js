import MovieRec from '@/Components/MovieRec'
import Explore from '@/Components/Explore.json';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  const background = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-yellow-500",
    "bg-orange-500",
];
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center ">
          <h1 className="text-3xl font-semibold text-gray-800">RecStream</h1>
          <nav>
            <ul className="flex space-x-4 text-gray-600">
              <li><a href="#home" className="hover:text-gray-900">Home</a></li>
              <li><a href="#categories" className="hover:text-gray-900">Categories</a></li>
              <li><a href="#community" className="hover:text-gray-900">Community</a></li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Community Section */}
      {/* Hero Section */}
      <section className="bg-gray-50 py-24 text-center">
        <div className="container mx-auto px-6 flex flex-col justify-around items-center gap-5">
          <h1 className='text-7xl text-gray-900  font-bold'>RecStream</h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Discover and Share Media Recommendations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Engage with a community driven by collective experiences and insights. Share your recommendations and discover new media across various categories.
          </p>
          <button className="bg-gray-800 text-white py-3 px-8 rounded-md hover:bg-gray-700 transition-all font-medium">
            Get Started
          </button>
        </div>
      </section>
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center mb-10">
            <h3 className="text-3xl font-semibold text-gray-900 my-8">Explore Categories</h3>
            <div className='grid grid-cols-2 gap-5 max-w-8xl mx-auto w-full'>
                {Explore.map((cate, index) => (
                      <Link key={index} href={`/Categories/${cate.title}`} passHref>
                    <div key={index} className="relative grid grid-cols-3 bg-gray-200 gap-5 rounded-md shadow-md overflow-hidden p-6">
                        <div className={`absolute -top-20 -left-5 w-32 h-32 ${background[index % background.length]} rotate-45 z-10`}></div>
                        <div className='col-span-2 z-50 h-full flex flex-col justify-between items-start p-2'>
                            <h1 className='text-gray-900 text-3xl font-poppins font-semibold cursor-pointer'>{cate.title}</h1>
                            <p className='text-gray-500 font-poppins font-normal'>{cate.description}</p>
                            <h4 className="text-gray-900 cursor-pointer text-md ">{cate.link}</h4>
                        </div>
                        <div className='group relative'>
                            <div className='absolute top-0 left-0 w-full h-full bg-gray-500 z-10 group-hover:rotate-12 ease-in-out duration-300 rounded-lg'></div>
                            <Image
                                src={cate.image}
                                alt='images'
                                width={200}
                                height={200}
                                className='z-50 object-contain rounded-lg relative'
                            />
                        </div>
                    </div>
                            </Link>
                ))}
            </div>
        </div>

        {/* Post */}
        <div className='flex w-full justify-center items-center mt-10'>
          <MovieRec />
        </div>
      <div className="container mx-auto">
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">Join the Community</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Share your favorite media and get personalized recommendations from others. Be part of a thriving community of media enthusiasts!
        </p>
        <button className="bg-gray-800 text-white py-3 px-8 rounded-md hover:bg-gray-700 transition-all font-medium">
          Sign Up Now
        </button>
      </div>
    </div>
  );
}
