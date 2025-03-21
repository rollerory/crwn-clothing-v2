import { Outlet } from "react-router";
import CategoriesContainer from "../../components/categories-container/categories-container.component";
import categories from "../../data/categories.json";

const Home = () => {
    return (
        <div>
            <CategoriesContainer categories={categories} />
            <Outlet />
        </div>
    );
}

export default Home;
