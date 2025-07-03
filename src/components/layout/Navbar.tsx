
import { useState } from 'react';
import { Link } from 'react-router';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (

        <div className='bg-[#f7f3ed] '>
            <nav className="shadow-md py-4 px-6 md:px-10">
                <div className=" flex justify-between items-center">


                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-gray-800 hover:text-gray-900 transition-colors duration-200">

                            <img className='w-8 h-8 mr-2' src="https://i.ibb.co/TDMkVq5s/Martz90-Circle-Books-512.png" alt="" />
                            <span className="text-xl font-semibold text-red-700">Word & Wisdom</span>

                        </Link>
                    </div>


                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200">Home</Link>
                        <Link to="/books" className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200">All Books</Link>
                        <Link to="/create-book" className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200">Add Book</Link>
                        <Link to="/borrow-summary" className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200">Borrow Summary</Link>
                    </div>


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


                <div className={`md:hidden mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <Link
                        to="/"
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                        onClick={toggleMobileMenu}
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