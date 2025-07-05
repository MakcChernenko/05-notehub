import fetchMovies from '../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import { Movie } from '../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [article, setArticle] = useState<Movie[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<Movie | null>(null);

  const handleArticle = async (topic: string): Promise<void> => {
    if (!topic) {
      setIsError(true);
      setArticle([]);
      return;
    }
    try {
      setIsLoad(true);
      setIsError(false);
      const data: Movie[] = await fetchMovies(topic);
      setArticle(data);
      console.log(data);
      setIsLoad(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div>
      {isOpenModal && (
        <MovieModal movie={isOpenModal} onClose={() => setIsOpenModal(null)} />
      )}
      <SearchBar onSubmit={handleArticle} />
      {isLoad && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid onSelect={setIsOpenModal} listMovie={article} />
    </div>
  );
}
export default App;
