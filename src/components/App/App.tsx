import fetchMovies from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function App() {
  const [article, setArticle] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<Movie | null>(null);

  const handleArticle = async (query: string): Promise<void> => {
    if (!query.trim()) {
      toast.error('Please enter your search query');
      return;
    }
    setIsLoading(true);
    setIsError(false);
    setArticle([]);
    try {
      const data: Movie[] = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setArticle(data);
    } catch {
      setIsError(true);
      toast.error('Something went wrong while fetching movies.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Toaster position="top-right" />
      {isOpenModal && (
        <MovieModal movie={isOpenModal} onClose={() => setIsOpenModal(null)} />
      )}
      <SearchBar onSubmit={handleArticle} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid onSelect={setIsOpenModal} movies={article} />
    </div>
  );
}
export default App;
