import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetBookByIdQuery } from "@/redux/features/books/booksApi";
import { skipToken } from '@reduxjs/toolkit/query/react';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useGetBookByIdQuery(id ?? skipToken);

  if (!id) {
    return <p className="text-center mt-10 text-red-500">Invalid book ID.</p>;
  }

  if (isLoading) return <p className="text-center mt-10">Loading book details...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load book details.</p>;
  if (!book) return <p className="text-center mt-10">Book not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Button variant="outline" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Description:</strong> {book.description || "No description available."}
        </p>
      </div>
    </div>
  );
}
