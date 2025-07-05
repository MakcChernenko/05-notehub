import css from './ErrorMessage.module.css';
function ErrorMessage() {
  return (
    <div className={css.text}>There was an error, please try again...</div>
  );
}

export default ErrorMessage;
