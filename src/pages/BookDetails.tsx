import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetBookByIdQuery } from "@/redux/features/books/booksApi";
import { skipToken } from '@reduxjs/toolkit/query/react';

export default function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: book, isLoading, isError } = useGetBookByIdQuery(id ?? skipToken);

    if (!id) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 p-4">
                <p className="text-xl text-red-500 font-medium text-center">
                    Invalid book ID. Please ensure the URL is correct.
                </p>
            </div>
        );
    }

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 p-4">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-xl text-gray-700 mt-4">Loading book details...</p>
            </div>
        </div>
    );

    if (isError) return (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 p-4">
            <p className="text-xl text-red-600 font-medium text-center">
                Failed to load book details. Please check your internet connection or try again later.
            </p>
        </div>
    );

    if (!book) return (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 p-4">
            <p className="text-xl text-gray-700 font-medium text-center">
                Book not found. It might have been moved or doesn't exist.
            </p>
        </div>
    );


    return (
        <div className="min-h-screen  py-12 ">
            <div className="max-w-7xl mx-auto">

                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Books
                </Button>


                <div className="bg-white rounded shadow-lg overflow-hidden md:flex transform transition-transform duration-300 hover:scale-[1.005]">

                    <div className="md:w-1/3 p-6 md:p-10 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">

                        <div className="w-56 h-80 bg-blue-200 rounded-lg shadow-inner flex flex-col items-center justify-center text-indigo-700 text-7xl font-extrabold p-4">
                            📚
                            <span className="text-lg mt-3 text-indigo-600 text-center font-semibold">{book.genre}</span>
                        </div>
                    </div>


                    <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-between">
                        <div>

                            <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {book.title}
                            </h1>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-lg">
                                <p className="text-gray-700 flex items-center">
                                    <span className="font-semibold text-gray-800 w-24 flex-shrink-0">Author:</span>
                                    <span className="ml-2 text-gray-900">{book.author}</span>
                                </p>
                                <p className="text-gray-600 flex items-center">
                                    <span className="font-semibold text-gray-800 w-24 flex-shrink-0">Genre:</span>
                                    <span className="ml-2 text-gray-900">{book.genre}</span>
                                </p>
                                <p className="text-gray-600 flex items-center">
                                    <span className="font-semibold text-gray-800 w-24 flex-shrink-0">ISBN:</span>
                                    <span className="ml-2 font-mono text-base text-gray-900">{book.isbn}</span>
                                </p>
                                <p className="text-gray-600 flex items-center">
                                    <span className="font-semibold text-gray-800 w-24 flex-shrink-0">Published:</span>
                                    <span className="ml-2 text-gray-900">
                                        {book.createdAt ? new Date(book.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}
                                    </span>
                                </p>
                                <p className="text-gray-600 flex items-center">
                                    <span className="font-semibold text-gray-800 w-24 flex-shrink-0">Copies:</span>
                                    <span className="ml-2 text-gray-900">{book.copies}</span>
                                </p>
                                <p className="text-gray-600 flex items-center">
                                    <span className="font-semibold text-gray-800 w-24 flex-shrink-0">Available:</span>
                                    <span className={`ml-2 text-gray-900 ${book.available ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}`}>
                                        {book.available ? 'Yes' : 'No'}
                                    </span>
                                </p>

                            </div>


                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">description</h2>
                                <p className="text-gray-700 leading-relaxed text-base tracking-wide">
                                    {book.description || "No detailed synopsis available for this book at the moment. Immerse yourself in the story to discover its unique narrative!"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}