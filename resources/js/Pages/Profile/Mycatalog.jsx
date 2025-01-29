import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

const MyCatalog = () => {
  const { songs, message } = usePage().props;

  return (
    <Layout>
      <h1>Le tue Canzoni</h1>
      {message && <p>{message}</p>}
      {songs && songs.length > 0 ? (
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              <h2>{song.title}</h2>
              <p>{song.lyrics}</p>
              {song.cover && (
                <img
                  src={`/storage/${song.cover}`}
                  alt={song.title}
                  style={{ maxWidth: '200px', borderRadius: '8px' }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Non hai ancora caricato nessuna canzone.</p>
      )}
    </Layout>
  );
};

export default MyCatalog;

