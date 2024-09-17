import Data from '/public/data.json';

const CategoryPage = ({ params }) => {
  const { id } = params;
  const background = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-yellow-500",
    "bg-orange-500",
];

  // Find the category data based on the 'id' param
  const categoryData = Data.find((category) => category.category === id);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <h1 className="text-4xl font-bold mb-6">
        {categoryData ? categoryData.category : 'Category Not Found'}
      </h1>

      {categoryData ? (
        // Iterate over the items in pairs (Question, Answer)
        categoryData.items.map((item, index) => {
          // Ensure even index is the question and odd index is the answer
          if (index % 2 === 0) {
            const question = item;
            const answer = categoryData.items[index + 1];

            return (
              <div
                key={index}
                className="w-full relative max-w-7xl bg-white rounded-lg shadow-md mb-6 p-6 overflow-hidden"
              >
                <div className={`absolute -top-20 -left-5 w-32 h-32 ${background[index % background.length]}  rotate-45 z-10`}></div>
                <div className={`absolute -bottom-20 -right-5 w-32 h-32 ${background[index % background.length]}  rotate-45 z-10`}></div>
                {/* Question */}
                <div className="mb-4 relative z-50">
                  <h2 className="w-full bg-white p-2 rounded-lg shadow-xs text-2xl font-semibold text-gray-900 mb-2">
                    {question.name} asks:
                  </h2>
                  <p className="text-lg text-gray-800 font-medium">
                    {question.text}
                  </p>
                </div>

                {/* Divider */}
                <hr className="border-t border-gray-200 mb-4" />

                {/* Response */}
                {answer && (
                  <div className="relative ml-6 pl-4 border-l-4 border-gray-500 z-50">
                    <h3 className="text-xl font-semibold text-gray-700">
                      {answer.name} replies:
                    </h3>
                    <p className="text-lg text-gray-700">{answer.text}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {question.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-600 text-sm font-medium py-1 px-2 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })
      ) : (
        <p className="text-lg text-gray-700">No data available for this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
