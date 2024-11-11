import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
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
            <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};