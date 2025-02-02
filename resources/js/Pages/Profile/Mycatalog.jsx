import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';

const MyCatalog = () => {
  const { songs, message } = usePage().props;
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    console.log('Songs:', songs);
    setSongsList(songs);
  }, [songs]);

  return (
    <Layout>
      <h1>Le tue Canzoni</h1>
      {message && <p>{message}</p>}
      {songsList && songsList.length > 0 ? (
        <ul>
          {songsList.map((song) => (
            <li key={song.id}>
              <h2>{song.title}</h2>
              <Link href={route("songs.show", { id: song.id })}>
                view
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessuna canzone trovata</p>
      )}
    </Layout>
  );
};

export default MyCatalog;

