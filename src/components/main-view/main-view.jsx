import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";

export const MainView = () => {
    const url = "https://my-movie-api-8xod.onrender.com/movies";
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMovies(data);
            });
    })

    const [selectedMovie, setSelectedMovie] = useState(null);


    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => {
            return movie.genre.name === selectedMovie.genre.name;
        })
        console.log(similarMovies);
        return (
            <div>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)} />
                <hr />
                <h2>Similar Movies</h2>
                {similarMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelection) => {
                            setSelectedMovie(newSelection);
                        }}
                    />
                ))}
            </div>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelection) => {
                        setSelectedMovie(newSelection);
                    }}
                />
            ))}
        </div>
    );
};

