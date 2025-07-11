import css from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { useId, FormEvent } from 'react';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const fieldId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = (formData.get('query') as string).trim();

    if (query.length < 3) {
      toast.error('Search must be at least 3 characters');
      return;
    }

    onSubmit(query);
    event.currentTarget.reset();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a href="https://www.themoviedb.org/">Powered by TMDB</a>
        <form className={css.form} onSubmit={handleSubmit}>
          <label htmlFor={fieldId} className={css.visuallyHidden}>
            Search movies
          </label>
          <input
            id={fieldId}
            className={css.input}
            type="text"
            placeholder="Search movies..."
            name="query"
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
