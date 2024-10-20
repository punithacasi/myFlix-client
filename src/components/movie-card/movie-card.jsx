import PropTypes from "prop-types";


export const MovieCard = ({ movie, onMovieClick }) => {
    console.log(movie);
    return (
        <div onClick={() => {
            onMovieClick(movie);
        }}>
            {movie.title}
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};