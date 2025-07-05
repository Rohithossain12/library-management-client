import { Button } from '@/components/ui/button';
import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/features/books/booksApi';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import BorrowModal from '@/redux/features/books/BorrowModal';
import EditBookModal from '@/redux/features/books/EditBookModal';

export default function AllBooks() {
    const navigate = useNavigate()
    const [deleteBook] = useDeleteBookMutation();
    const { data: books, isLoading } = useGetBooksQuery(undefined, {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true
    });

    if (isLoading) return <LoadingSpinner />;


    const handleDelete = async (id: string) => {
        try {
            await deleteBook(id).unwrap();
            toast.success("Book deleted successfully");
        } catch (error) {
            toast.error("Failed to delete book");
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto  py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                📚 All Books
            </h1>

            {books && Array.isArray(books) && books.length > 0 ? (
                <div className="w-full overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-[800px] w-full text-sm text-left text-gray-700 bg-white">
                        <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Author</th>
                                <th className="px-4 py-3 hidden sm:table-cell">Genre</th>
                                <th className="px-4 py-3 hidden md:table-cell">ISBN</th>
                                <th className="px-4 py-3">Copies</th>
                                <th className="px-4 py-3">Availability</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr
                                    key={book._id}
                                    className="border-b hover:bg-gray-50 transition-all duration-200"
                                >
                                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium">{book.title}</td>
                                    <td className="px-4 py-3">{book.author}</td>
                                    <td className="px-4 py-3 hidden sm:table-cell">{book.genre}</td>
                                    <td className="px-4 py-3 hidden md:table-cell">{book.isbn}</td>
                                    <td className="px-4 py-3">{book.copies}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${book.available
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {book.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                title="Edit"
                                                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                                            >
                                                
                                                <EditBookModal book={book} />
                                            </button>
                                            <Button
                                                onClick={() => handleDelete(book._id)}
                                                title="Delete"
                                                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                                            >
                                                🗑️
                                            </Button>
                                            <Button
                                                title="Borrow"
                                                className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                                            >
                                                <BorrowModal book={book} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-10">No books found.</p>
            )}

            <div className="mt-6 text-center">
                <Button
                    onClick={() => navigate("/create-book")}
                    className="bg-green-600 text-white hover:bg-green-700 font-semibold  rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    Add New Book
                </Button>
            </div>
            <Toaster />
        </div>
    );
}
