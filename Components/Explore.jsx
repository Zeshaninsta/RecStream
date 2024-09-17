import React from 'react';
import Explore from '@/Components/Explore.json';
import Image from 'next/image';
import Link from 'next/link';

const ExploreCategories = () => {
    const background = [
        "bg-purple-500",
        "bg-blue-500",
        "bg-red-500",
        "bg-cyan-500",
        "bg-yellow-500",
        "bg-orange-500",
    ];
    return (
      <div className='w-full bg-red-500'>
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center mb-10">
            <h3 className="text-3xl font-semibold text-gray-900 my-8">Explore Categories</h3>
            <div className='grid grid-cols-2 gap-5 max-w-8xl mx-auto w-full'>
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
                            <Image
                                src={cate.image}
                                alt='images'
                                width={200}
                                height={200}
                                className='z-50 object-contain rounded-lg relative'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default ExploreCategories;
