import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-[#f7f3ed] border-t border-[#e0d9cf] relative pt-10 pb-8 md:pb-12">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

                <div className="flex flex-col items-start space-y-2">
                    <img
                        src="https://i.ibb.co/TDMkVq5s/Martz90-Circle-Books-512.png"
                        alt="Word & Wisdom"
                        className="w-14 h-14"
                    />
                    <p className="text-xl font-semibold text-red-700">
                        Word & Wisdom
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Address</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        1418 River Drive, Suite 35 <br />
                        Cottonhall, CA 9622 <br />
                        United States
                    </p>
                </div>


                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Contact</h3>
                    <p className="text-sm text-gray-600">+1 530 347 4607</p>
                    <a
                        href="mailto:printpress@example.net"
                        className="text-sm text-[#c0392b] hover:underline mt-1 inline-block"
                    >
                        printpress@example.net
                    </a>
                </div>


                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Navigation</h3>
                    <nav className="flex flex-col space-y-1 text-sm text-gray-600">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/books" className="hover:underline">All Books</Link>
                        <Link to="/create-book" className="hover:underline">Add Book</Link>
                        <Link to="/borrow-summary" className="hover:underline">Borrow Summary</Link>
                    </nav>
                </div>
            </div>


            <div className="border-t border-[#e0d9cf] mt-10 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center text-xs text-gray-600 font-sans">
                <p className="mb-2">
                    <a href="#" className="text-[#c0392b] hover:underline">
                        Privacy Policy
                    </a>{" "}
                    / This is a sample website - cmsmasters &copy; 2025 / All Rights Reserved
                </p>
            </div>


            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-[#c0392b] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                aria-label="Scroll to top"
            >
                <FaArrowUp className="text-lg" />
            </button>
        </footer>
    );
};

export default Footer;
