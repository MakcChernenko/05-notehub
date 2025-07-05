import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query.trim() === '') {
      toast.error('Please enter your search query');
      return;
    }
    onSubmit(query);
  };
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a href="https://www.themoviedb.org/">Powered by TMDR</a>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            placeholder="Search movies..."
            name="query"
          />
          <button className={css.button}>Search</button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
