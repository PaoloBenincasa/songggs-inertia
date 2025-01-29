import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

const Index = () => {
  const { songs } = usePage().props;
  const publicSongs = songs?.filter(song => !song.is_private) || [];

  return (
    <Layout>
      <h1>Canzoni pubbliche</h1>
      {publicSongs.length > 0 ? (
        <ul>
          {publicSongs.map((song) => (
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
        <p>Non ci sono canzoni pubbliche disponibili.</p>
      )}
    </Layout>
  );
};

export default Index;
