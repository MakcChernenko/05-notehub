import css from './Loader.module.css';
import { BarLoader } from 'react-spinners';

function Loader() {
  return (
    <div className={css.loader}>
      <p className={css.text}>Loading movies, please wait...</p>
      <BarLoader className={css.barLoader} />
    </div>
  );
}

export default Loader;
