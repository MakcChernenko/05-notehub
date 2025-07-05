import css from './SearchBar.module.css';

interface Prop {
  onSubmit: (value: string) => void;
}

function SearchBar({ onSubmit }: Prop) {
  const handleSubmit = (formData: FormData) => {
    const topic = formData.get('topic') as string;
    if (topic.trim() === '') {
      alert('Please enter your search query');
      return;
    }
    onSubmit(topic);
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
            name="topic"
          />
          <button className={css.button}>Search</button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
