import css from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { useId } from 'react';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const fieldId = useId();

  const action = (formData: FormData) => {
    const query = (formData.get('query') as string).trim();

    if (query.length < 3) {
      toast.error('Search must be at least 3 characters');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a href="https://www.themoviedb.org/">Powered by TMDB</a>
        <form className={css.form} action={action}>
          <label htmlFor={fieldId} className={css.visuallyHidden}>
            Search movies
          </label>
          <input
            id={fieldId}
            className={css.input}
            type="text"
            placeholder="Search movies..."
            name="query"
            required
            minLength={3}
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
