import axios from 'axios';
import { Movie } from '../components/types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
console.log('TMDB Token:', API_KEY);

interface MovieApiResponse {
  results: Movie[];
}
const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieApiResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: { query },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data.results;
};

export default fetchMovies;
