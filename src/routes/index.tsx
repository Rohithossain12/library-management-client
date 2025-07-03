import { createBrowserRouter } from "react-router"
import ErrorPage from "@/pages/ErrorPage";
import App from "@/App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [

        ],
    },
]);



export default router;