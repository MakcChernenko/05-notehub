import css from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { useId } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

interface FormValues {
  query: string;
}

const OrderFormSchema = Yup.object().shape({
  query: Yup.string()
    .min(3, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
});

function SearchBar({ onSubmit }: SearchBarProps) {
  const fieldId = useId();

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const trimmedQuery = values.query.trim();
    if (!trimmedQuery) {
      toast.error('Please enter your search query');
      return;
    }

    onSubmit(trimmedQuery);
    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a href="https://www.themoviedb.org/">Powered by TMDB</a>
        <Formik<FormValues>
          validationSchema={OrderFormSchema}
          initialValues={{ query: '' }}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <label htmlFor={fieldId}></label>
            <Field
              id={fieldId}
              className={css.input}
              type="text"
              placeholder="Search movies..."
              name="query"
            />
            <ErrorMessage name="query" component="span" className={css.error} />
            <button type="submit" className={css.button}>
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}

export default SearchBar;
