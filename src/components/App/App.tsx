import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createPortal } from 'react-dom';

import { fetchNotes } from '../../services/noteService';
import { FetchNotesResponse } from '../../services/noteService';

import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

import css from './App.module.css';
import { useDebounce } from 'use-debounce';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearchTerm],
    queryFn: () =>
      fetchNotes({ page, perPage: 12, search: debouncedSearchTerm }),
    placeholderData: () => {
      return queryClient.getQueryData(['notes', page - 1, debouncedSearchTerm]);
    },
  });
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note
        </button>
      </header>

      {!isLoading && data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : null}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {isModalOpen &&
        createPortal(
          <Modal onClose={handleCloseModal}>
            <NoteForm onSuccess={handleCloseModal} />
          </Modal>,
          document.getElementById('modal-root') as HTMLElement
        )}
    </div>
  );
};

export default App;
