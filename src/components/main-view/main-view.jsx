import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { useState, useEffect } from "react";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedToken : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const urlAPI = "https://my-movie-api-8xod.onrender.com";
    //const urlAPI = "http://localhost:8080";
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch(urlAPI + "/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMovies(data);
            });
    }, [token])



    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    localStorage.setItem("user", user);
                    setToken(token);
                    localStorage.setItem("token", token);
                }} />
                or
                <SignupView />
            </>
        )
    }

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
            <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
        </div>
    );
};

