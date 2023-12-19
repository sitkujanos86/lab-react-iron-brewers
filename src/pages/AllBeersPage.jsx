import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "../components/Search";
import beersJSON from "./../assets/beers.json";

function AllBeersPage() {
  const [beers, setBeers] = useState(beersJSON);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await axios.get(
          "https://ih-beers-api2.herokuapp.com/beers"
        );

        setBeers(response.data);
      } catch (error) {
        console.error("Error fetching beers:", error);
      }
    };
    fetchBeers();
  }, []);
  return (
    <>
      <Search />

      <div className="d-inline-flex flex-wrap justify-content-center align-items-center w-100 p-4">
        {beers &&
          beers.map((beer, i) => {
            return (
              <div key={i}>
                <Link to={"/beers/" + beer._id}>
                  <div
                    className="card m-2 p-2 text-center"
                    style={{ width: "24rem", height: "18rem" }}
                  >
                    <div className="card-body">
                      <img
                        src={beer.image_url}
                        style={{ height: "6rem" }}
                        alt={"image of" + beer.name}
                      />
                      <h5 className="card-title text-truncate mt-2">
                        {beer.name}
                      </h5>
                      <h6 className="card-subtitle mb-3 text-muted">
                        <em>{beer.tagline}</em>
                      </h6>
                      <p className="card-text">
                        Created by: {beer.contributed_by}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default AllBeersPage;
