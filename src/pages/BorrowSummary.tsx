import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetSummaryQuery } from "@/redux/features/borrow/borrowApi";

export default function BorrowSummary() {
    const { data, isLoading } = useGetSummaryQuery();

    if (isLoading) return <LoadingSpinner/>

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                📋 Borrow Summary
            </h1>

            {data?.data?.length ? (
                <div className="overflow-x-auto">
                    <table className="min-w-[640px] w-full bg-white text-sm text-left text-gray-700 rounded shadow">
                        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-600">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Book Title</th>
                                <th className="px-4 py-3">ISBN</th>
                                <th className="px-4 py-3 text-right">Total Borrowed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((row,index) => (
                                <tr key={row.book.isbn} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{index+1}</td>
                                    <td className="px-4 py-3">{row.book.title}</td>
                                    <td className="px-4 py-3">{row.book.isbn}</td>
                                    <td className="px-4 py-3 text-right">{row.totalQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10 text-lg">
                    No borrow activity yet.
                </p>
            )}
        </div>
    );
}
