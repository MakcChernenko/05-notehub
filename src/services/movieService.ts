import axios from 'axios';
import { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieApiResponse> => {
  const response = await axios.get<MovieApiResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: { query, page },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data;
};
export default fetchMovies;
