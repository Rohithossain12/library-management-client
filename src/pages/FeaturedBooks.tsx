import { useGetBooksQuery } from "@/redux/features/books/booksApi";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function FeaturedBooks() {
    const { data: books, isLoading, isError } = useGetBooksQuery();
    const navigate = useNavigate();

    const featuredBooks = books?.slice(0, 6);

    const cardColors = [
        "bg-gradient-to-br from-green-100 to-green-50",
        "bg-gradient-to-br from-blue-100 to-blue-50",
        "bg-gradient-to-br from-yellow-100 to-yellow-50",
        "bg-gradient-to-br from-pink-100 to-pink-50",
        "bg-gradient-to-br from-purple-100 to-purple-50",
        "bg-gradient-to-br from-orange-100 to-orange-50",
    ];

    return (
        <section className=" px-4 max-w-7xl mx-auto">
            <div className=" mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">📚 Featured Books</h2>
            </div>

            {isLoading && <p>Loading featured books...</p>}
            {isError && <p>Failed to load books.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featuredBooks?.map((book, idx) => (
                    <div
                        key={book._id}
                        onClick={() => navigate(`/books/${book._id}`)}
                        className={`rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-gray-800 cursor-pointer flex flex-col justify-between ${cardColors[idx % cardColors.length]}`}
                    >
                        <div className="text-4xl mb-4">📖</div>
                     
                        <div className="mb-2 h-14"> 
                            <h3 className="font-semibold line-clamp-2">
                                {book.title}
                            </h3>
                        </div>
                       
                        <div className="h-5"> 
                            <p className="text-sm text-gray-700 line-clamp-1"> 
                                by {book.author}
                            </p>
                        </div>
                        <p className="text-xs mt-3 inline-block bg-white/60 px-3 py-1 rounded-full text-gray-600">
                            {book.genre}
                        </p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-5 md:mt-8">
                <Button onClick={() => navigate("/books")} variant="outline">
                    View All Books
                </Button>
            </div>
        </section>
    );
}