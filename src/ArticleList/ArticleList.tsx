import { Article } from '../article/article';

interface ArticleListProps {
  items: Article[];
}

function ArticleList({ items }: ArticleListProps) {
  return (
    <ul>
      {items.map(({ title, objectID, url }) => (
        <li key={objectID}>
          <a href={url}>{title}</a>
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
