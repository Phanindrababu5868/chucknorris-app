import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import "./App.css";
import Categories from "./Components/Categories/index";

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetchCategories = async () => {
      setLoading(true);
      const fetchData = await fetch(
        "https://api.chucknorris.io/jokes/categories"
      );
      const jsonData = await fetchData.json();
      setLoading(false);
      setCategories(jsonData);
    };
    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-bg-container">
          <Bars color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <div className="home-bg-container">
          <h1 className="heading">Chuck Norries</h1>
          <Categories categories={categories} />
        </div>
      )}
    </>
  );
}

export default App;
