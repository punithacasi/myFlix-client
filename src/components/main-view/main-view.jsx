import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";

export const MainView = () => {
    const url = "http://localhost:8080/movies";
    const [movies, setMovies] = useState([]);
    console.log("tEST");
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMovies(data);
            });
    })


    // const [movies, setMovies] = useState([
    //     {
    //         "id": 1,
    //         "title": "Inception",
    //         "genre": {
    //             "name": "Science Fiction",
    //             "description": "Explores the concept of shared dreaming and the manipulation of dreams."
    //         },
    //         "image": "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    //         "director": "Christopher Nolan"
    //     },
    //     {
    //         "id": 2,
    //         "title": "The Shawshank Redemption",
    //         "genre": {
    //             "name": "Drama",
    //             "description": "A story of hope and friendship set in a prison."
    //         },
    //         "image": "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    //         "director": "Frank Darabont"
    //     },
    //     {
    //         "id": 3,
    //         "title": "The Godfather",
    //         "genre": {
    //             "name": "Crime",
    //             "description": "An epic tale of a mafia family and their power struggles."
    //         },
    //         "image": "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    //         "director": "Francis Ford Coppola"
    //     },
    //     {
    //         "id": 4,
    //         "title": "The Dark Knight",
    //         "genre": {
    //             "name": "Action",
    //             "description": "Batman battles the Joker, a criminal mastermind who seeks to create chaos."
    //         },
    //         "image": "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
    //         "director": "Christopher Nolan"
    //     },
    //     {
    //         "id": 5,
    //         "title": "Forrest Gump",
    //         "genre": {
    //             "name": "Drama",
    //             "description": "The life journey of a man with a low IQ who influences several historical events."
    //         },
    //         "image": "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    //         "director": " Robert Zemeckis"
    //     }
    // ]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    if (selectedMovie) {
        console.log("VIEW");
        console.log(selectedMovie);
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)} />
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

