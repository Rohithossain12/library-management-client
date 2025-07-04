const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-280px)]">
            <div className="w-16 h-16 border-8 border-t-8 border-gray-300 border-t-blue-600 rounded-full animate-spin ease-in-out duration-1000">

            </div>
        </div>
    );
};

export default LoadingSpinner;
