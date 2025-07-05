import { useGetBooksQuery } from "@/redux/features/books/booksApi";

export default function GenresSection() {
  const { data: books, isLoading, isError } = useGetBooksQuery();

 
  const uniqueGenres = Array.from(
    new Set(books?.map((book) => book.genre))
  ).filter(Boolean);



  return (
    <section className=" px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        🎯 Explore by Genre
      </h2>

      {isLoading && <p className="text-center">Loading genres...</p>}
      {isError && <p className="text-center text-red-600">Failed to load genres.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueGenres?.map((genre) => (
          <div
            key={genre}
            className="bg-blue-50 hover:bg-blue-100 cursor-pointer p-6 rounded-xl text-center transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="text-4xl mb-3">📘</div>
            <p className="font-semibold text-blue-700 text-lg">{genre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
