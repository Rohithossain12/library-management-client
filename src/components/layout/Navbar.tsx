
import { useState } from 'react';
import { Link } from 'react-router';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        // Navbar Container
        <div className='bg-gray-100 '>
            <nav className="shadow-md py-4 px-6 md:px-10">
                <div className=" flex justify-between items-center">

                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-gray-800 hover:text-gray-900 transition-colors duration-200">
                            {/* Book Icon */}
                            <svg className="w-8 h-8 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm6 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-xl font-semibold text-red-700">Book Nook</span>
                            <span className="text-sm font-light text-gray-600 ml-1 hidden sm:inline">Library</span>
                        </Link>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200">Home</Link>
                        <Link to="/books" className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200">All Books</Link>
                        <Link to="/create-book" className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200">Add Book</Link>
                        <Link to="/borrow-summary" className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200">Borrow Summary</Link>
                    </div>

                    {/* Mobile Menu Button (Hamburger Icon) */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 hover:text-red-700 focus:outline-none focus:text-red-700"
                            aria-label="Toggle mobile menu"
                        >
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu (Hidden by default, toggled by state) */}
                <div className={`md:hidden mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <Link
                        to="/"
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                        onClick={toggleMobileMenu} // Close menu on link click
                    >Home</Link>
                    <Link
                        to="/books"
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                        onClick={toggleMobileMenu}
                    >All Books</Link>
                    <Link
                        to="/create-book"
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                        onClick={toggleMobileMenu}
                    >Add Book</Link>
                    <Link
                        to="/borrow-summary"
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                        onClick={toggleMobileMenu}
                    >Borrow Summary</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;