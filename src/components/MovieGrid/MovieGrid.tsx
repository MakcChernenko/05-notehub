import css from './MovieGrid.module.css';
import { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <div>
      <ul className={css.grid}>
        {movies.map(movie => {
          return (
            <li
              className={css.card}
              key={movie.id}
              onClick={() => onSelect(movie)}
            >
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2 className={css.title}>{movie.title}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MovieGrid;
