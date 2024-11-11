import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useState } from "react";

export const MovieView = ({ urlAPI, user, token, movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);

    let similarMovies = movies.filter((item) => {
        return item.genre.name === movie.genre.name
            && item.title !== movie.title;
    })

    return (
        <div>
            <div>
                <img src={movie.imagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
                <p>{movie.genre.description}</p>
            </div>
            <div>
                <span>Directed by: </span>
                <span>{movie.director.name}</span>
                <p>{movie.genre.bio}</p>
            </div>
            <Link to={`/`}>
                <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
            </Link>
            <hr />
            <h2>Similar Movies</h2>
            <Row className="justify-content-md-center">
                {similarMovies.map((movie) => (
                    <Col className="mb-5" key={movie.id} lg={3} md={4} sm={12}>
                        <MovieCard
                            urlAPI={urlAPI}
                            user={user}
                            token={token}
                            movie={movie}
                        />
                    </Col>
                ))}
            </Row>
        </div >
    );
};