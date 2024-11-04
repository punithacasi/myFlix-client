import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import { Col, Button } from "react-bootstrap";


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
            <Row className="justify-content-md-center">
                <Col md={5}>

                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        localStorage.setItem("user", user);
                        setToken(token);
                        localStorage.setItem("token", token);
                    }} />
                    or
                    <SignupView />
                </Col>
            </Row>
        )
    }

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => {
            return movie.genre.name === selectedMovie.genre.name
                && movie.title !== selectedMovie.title;
        })
        console.log(similarMovies);
        return (
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)} />
                    <hr />
                    <h2>Similar Movies</h2>
                    <Row className="justify-content-md-center">
                        {similarMovies.map((movie) => (
                            <Col className="mb-5" key={movie.id} lg={3} md={4} sm={12}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelection) => {
                                        setSelectedMovie(newSelection);
                                    }}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <Row>
            {movies.map((movie) => (
                <Col className="mb-5" key={movie.id} lg={2} md={3} sm={12}>
                    <MovieCard
                        movie={movie}
                        onMovieClick={(newSelection) => {
                            setSelectedMovie(newSelection);
                        }}
                    />
                </Col>
            ))}
            <Col sm={12}>
                <Button variant="primary" onClick={() => { setUser(null); setToken(null); }}>Logout</Button>
            </Col>
        </Row>
    );
};

