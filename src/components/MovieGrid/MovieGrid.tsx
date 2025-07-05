import css from './MovieGrid.module.css';
import { Movie } from '../../types/movie';

interface Props {
  listMovie: Movie[];
  onSelect: (movie: Movie) => void;
}

function MovieGrid({ listMovie, onSelect }: Props) {
  console.log(listMovie);

  return (
    <div>
      <ul className={css.grid}>
        {listMovie.map(movie => {
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
