import "./Home.css";
import { useEffect, useState } from "react";
import { MoviesComplete } from "../../types/supabase-types-own";
import supabaseClient from "../../lib/supabaseClient";

const Home = () => {
  const [movies, setMovies] = useState<MoviesComplete[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    ascending: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      let selectQuery = supabaseClient.from("movies").select("*, directors(*)");

      if (searchTerm) {
        selectQuery = selectQuery.ilike("title", `%${searchTerm}%`);
      }

      if (sortConfig) {
        selectQuery = selectQuery.order(sortConfig.key, {
          ascending: sortConfig.ascending,
        });
      }

      const result = await selectQuery;
      if (result.error) {
        console.error("Movie not found in database", result.error);
      }
      if (result.data) {
        setMovies(result.data);
        console.log(result.data);
      }
    };
    fetchMovies();
  }, [searchTerm, sortConfig]);

  const handleYearUp = () => setSortConfig({ key: "year", ascending: true });
  const handleYearDown = () => setSortConfig({ key: "year", ascending: false });
  const handleBestRate = () =>
    setSortConfig({ key: "rating", ascending: false });

  return (
    <main>
      <div className="search-input">
        <input
          type="text"
          id="title-search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={() => setSearchTerm(inputValue)}>Search</button>
      </div>
      <div className="sort-buttons">
        <button onClick={handleYearUp}>Year Up</button>
        <button onClick={handleYearDown}>Year Down</button>
        <button onClick={handleBestRate}>Best Rate</button>
      </div>

      <section className="movies-container">
        {movies?.map((movie) => (
          <div key={movie.id} className="movie-information">
            <h1>{movie.title}</h1>
            <p>{movie.year}</p>
            <h2>
              {movie.directors?.firstName} {movie.directors?.lastName}
            </h2>

            <p>{movie.length}</p>
            <p>{movie.genres}</p>
            <p>{movie.rating}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
