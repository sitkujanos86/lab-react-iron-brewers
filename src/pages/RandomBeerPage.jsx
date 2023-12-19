import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import beersJSON from "./../assets/beers.json";
import axios from "axios";

function RandomBeersPage() {
  const [randomBeer, setRandomBeer] = useState(beersJSON[0]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomBeer = async () => {
      try {
        const beerList = await axios.get(
          "https://ih-beers-api2.herokuapp.com/beers"
        );

        const randomBeer =
          beerList.data[Math.round(Math.random() * beerList.data.length)];
        setRandomBeer(randomBeer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRandomBeer();
  }, []);

  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      <h2>Random Beer</h2>

      {randomBeer && (
        <>
          <img
            src={randomBeer.image_url}
            alt="beer"
            height="300px"
            width="auto"
          />
          <h3>{randomBeer.name}</h3>
          <p>{randomBeer.tagline}</p>
          <p>Attenuation level: {randomBeer.attenuation_level}</p>
          <p>Description: {randomBeer.description}</p>
          <p>Created by: {randomBeer.contributed_by}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default RandomBeersPage;
