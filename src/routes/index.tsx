import { createBrowserRouter } from "react-router"
import ErrorPage from "@/pages/ErrorPage";
import App from "@/App";
import Home from "@/pages/Home";
import AllBooks from "@/pages/AllBooks";
import AddBook from "@/pages/AddBook";
import BorrowSummary from "@/pages/BorrowSummary";
import BookDetails from "@/pages/BookDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/books",
                element: <AllBooks />,
            },
            {
                path: "/create-book",
                element: <AddBook />,
            },
            {
                path: "/borrow-summary",
                element: <BorrowSummary />,
            },
              {
        path: "/books/:id",     
        element: <BookDetails />,
      },
        ],
    },
]);



export default router;