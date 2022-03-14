import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import axios from "axios";

const root = document.getElementById("root");
// const throttle = (fn, wait) => {
//   let pre = Date.now()
//   return function() {
//      let context = this
//      let args = arguments
//      let now = Date.now()
//      if(now - pre >= wait) {
//         pre = Date.now()
//         fn.apply(context, args)
//      }
//   }
// }
const debounce = (fn, wait) => {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
};
const Header = () => {
  return (
    <header className="header">
      <div className="title">World Countries Data</div>
      <div className="description">Currently, we have 250 countries</div>
      <div className="tip">Hong Kong and Taiwan belong to China !!</div>
    </header>
  );
};
const Search = ({ toSearch }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search countries by name or language"
      onChange={debounce(toSearch, 1000)}
    ></input>
  );
};

const Main = ({ cards }) => {
  return (
    <main className="main">
      {cards.length <= 0
        ? ""
        : cards.map((obj) => {
            return <Card key={obj.name} obj={obj} />;
          })}
    </main>
  );
};
const Card = ({ obj }) => {
  const { name, flag, capital, languages, population, currencies } = obj;
  return (
    <div className="card">
      <img className="flag" src={flag} alt="pic"></img>
      <div className="countryName">{name}</div>
      <ul>
        <li>
          <span>Capital: </span>
          <span>{capital}</span>
        </li>
        <li>
          <span>Languages: </span>
          <span>{languages.map((obj) => obj.name).join(", ")}</span>
        </li>
        <li>
          <span>Population: </span>
          <span>{population.toLocaleString("en")}</span>
        </li>
        <li>
          <span>Currency: </span>
          <span>
            {currencies &&
              currencies.length &&
              currencies.map((obj) => obj.code).join(", ")}
          </span>
        </li>
      </ul>
    </div>
  );
};
const App = () => {
  const [cards, setCards] = useState([]);
  const ref = useRef();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const url = "https://restcountries.com/v2/all";
    try {
      const res = await axios.get(url);
      ref.current = res.data.filter(
        (obj) => obj.name !== "Hong Kong" && obj.name !== "Taiwan"
      );
      setCards(ref.current);
    } catch (err) {
      console.log(err);
    }
  };
  const toSearch = (e) => {
    let reg = new RegExp(e.target.value, 'i')
    reg
      ? setCards(ref.current.filter((obj) => reg.exec(obj.name) || reg.exec(obj.languages.map(language => language.name).join(""))))
      : setCards(ref.current);
  };
  return (
    <>
      <Header />
      <Search toSearch={toSearch} />
      <Main cards={cards} />
    </>
  );
};
ReactDOM.render(<App />, root);
