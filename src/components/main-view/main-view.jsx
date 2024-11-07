import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
//import UserProfile from "../user-profile/user-profile";


export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const urlAPI = "https://my-movie-api-8xod.onrender.com";
    //const urlAPI = "http://localhost:8080";
    const [movies, setMovies] = useState([]);
    //const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch(urlAPI + "/users", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let userFound = data.find(u => u._id === user._id);
                setUser(userFound);

            });
        fetch(urlAPI + "/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            });
    }, [token])

    return (
        <BrowserRouter>
            <NavigationBar user={user} onLoggedOut={(user, token) => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }} />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView
                                            urlAPI={urlAPI}
                                        />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            urlAPI={urlAPI}
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                console.log(user);
                                                localStorage.setItem("user", JSON.stringify(user));
                                                setToken(token);
                                                localStorage.setItem("token", token);
                                            }} />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    {/* <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={8}>
                                        <UserProfile
                                            urlAPI={urlAPI}
                                            user={user}
                                            token={token}
                                            movies={movies}
                                        />
                                    </Col>
                                )}
                            </>

                        }
                    /> */}
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            urlAPI={urlAPI}
                                            user={user}
                                            token={token}
                                            movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-5" key={movie.id} lg={3} md={4} sm={12}>
                                                <MovieCard
                                                    urlAPI={urlAPI}
                                                    user={user}
                                                    token={token}
                                                    movie={movie}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};

