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
  const [Movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string): Promise<void> => {
    if (!query.trim()) {
      toast.error('Please enter your search query');
      return;
    }
    setIsLoading(true);
    setIsError(false);
    setMovies([]);
    try {
      const data: Movie[] = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(data);
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
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid onSelect={setSelectedMovie} movies={Movies} />
    </div>
  );
}
export default App;
