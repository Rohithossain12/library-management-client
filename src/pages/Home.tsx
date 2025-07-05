import Banner from "@/components/Banner";
import FeaturedBooks from "./FeaturedBooks";
import GenresSection from "./GenresSection";


export default function Home() {
    return (
        <div>

            <Banner />
            <div className="mt-10 mb-10">
                <FeaturedBooks />
            </div>
            <div className="mt-10 mb-10">
                <GenresSection />
            </div>

        </div>
    )
}