import messages from '@/Components/Message.json'
export default function Home() {
  return (
    <div className='w-full h-auto flex flex-col justify-start items-center bg-gradient-to-r from-blue-400 to-purple-500'>
      <div className='w-full flex flex-col justify-center items-center p-5'>
        <h1 className='text-3xl font-bold text-gray-900 mb-3'>Movie Recommendation</h1>
        <div className='flex flex-col justify-center items-start gap-5 w-full bg-white max-w-7xl rounded-lg shadow-lg p-6 mx-auto'>
          {messages.map((item, index) => {
            return (
              <div key={index} className='flex flex-col gap-3  items-start w-full border-b border-gray-200 last:border-b-0 p-6'>
                <h2 className='text-2xl flex justify-start items-center gap-2 font-poppins font-semibold'> {item.name}</h2>
                <p className='w-full text-end text-md font-rubik text-gray-600'>{item.post}</p>
                <div className='flex flex-col justify-center items-start gap-1 max-w-3xl'>
                  {/* <h2 className='text-lg font-semibold text-gray-800'>{item.name}</h2> */}
                  <p className='text-gray-600'>{item.text}</p>
                  <div className='flex gap-5 mt-2'>
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className='bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full cursor-pointer'>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
