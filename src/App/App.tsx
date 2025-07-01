import OrderForm from '../OrderForm/OrderForm';
import { useState } from 'react';
import ArticleList from '../ArticleList/ArticleList';
import { Article } from '../article/article';
import { BarLoader } from 'react-spinners';
import { fetchArticles } from '../articleService/articleService';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loader, setLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleForm = async (topic: string) => {
    try {
      setLoader(true);
      setIsError(false);
      const data = await fetchArticles(topic);
      setLoader(false);
      setArticles(data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setLoader(false);
    }
  };
  console.log(articles);
  return (
    <div>
      <h1>Place your name</h1>
      <OrderForm onSubmit={handleForm} />
      {loader && <BarLoader color="green" />}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}
export default App;
