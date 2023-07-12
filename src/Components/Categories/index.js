import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const Categories = ({ categories }) => {
  const [selected, setSelected] = useState("");
  const [joke, setJoke] = useState("");
  const [id, setId] = useState(null);
  const [close, setClose] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    const fetchData = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${selected}`
    );
    const jsonData = await fetchData.json();
    setLoading(false);
    const jokes = jsonData.value;
    setJoke(jokes);
  };

  useEffect(() => {
    if (selected) {
      fetchJoke();
    }
  }, [selected]);

  return (
    <>
      <div className="cards-bg-container">
        {categories.map((categorie, index) => (
          <div
            key={index}
            className={`card ${index === id && "card-selected"}`}
            onClick={() => {
              setSelected(categorie);
              setId(index);
              setClose(false);
            }}
          >
            <h1 className="card-heading">{categorie}</h1>
            <p className="card-sub-heading">unlimited jokes on {categorie}</p>
          </div>
        ))}
      </div>
      {selected && (
        <div className={`${!close ? "popup-bg-container" : "hidden"} `}>
          <MdClose
            className="cross-icon"
            onClick={() => {
              setClose(true);
              setId(null);
            }}
          />
          <h1 className="popup-heading">
            {" "}
            <span> {selected} </span>
          </h1>
          <div className="text-bg-container">
            {loading ? (
              <ThreeDots color="#ffffff" height={50} width={50} />
            ) : (
              <p className="joke-text">" {joke} "</p>
            )}
            <button
              className="next-button"
              onClick={() => {
                fetchJoke();
              }}
            >
              Next joke
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
