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
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movieName, setMovieName] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', movieName, page],
    queryFn: () => fetchMovies(movieName, page),
    enabled: movieName !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  return (
    <div>
      <Toaster position="top-right" />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <SearchBar
        onSubmit={name => {
          if (!name.trim()) {
            toast.error('Please enter your search query');
            return;
          }
          setMovieName(name);
        }}
      />
      {data?.total_pages && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid onSelect={setSelectedMovie} movies={data?.results || []} />
    </div>
  );
}

export default App;
