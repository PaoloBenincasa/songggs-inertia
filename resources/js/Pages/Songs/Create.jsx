import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';

const Create = () => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [cover, setCover] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Invio dati al server:', {
      title,
      lyrics,
      is_private: isPrivate,
      cover,
    });
  };

  return (
    <AuthenticatedLayout>

      <div>
        <h1>Crea una nuova canzone</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Titolo:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Testo:</label>
            <textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} />
          </div>
          <div>
            <label>Canzone privata:</label>
            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
          </div>
          <div>
            <label>Copertina:</label>
            <input type="file" onChange={(e) => setCover(e.target.files[0])} />
          </div>
          <button type="submit">
            Crea canzone
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;