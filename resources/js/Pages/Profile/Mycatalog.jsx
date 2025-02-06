import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';

export default function MyCatalog(){
  const { songs, message } = usePage().props;
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    // console.log('Songs:', songs);
    setSongsList(songs);
  }, [songs]);

  return (
    <Layout>
      <div className='d-flex flex-column align-items-center pt-5'>
        <h1 className='undergreen'>Catalog</h1>
        <p>you have {songsList.length} songs</p>
        {message && <p>{message}</p>}
        {songsList && songsList.length > 0 ? (
          <div className='ps-0 w-25 mt-3'>
            {songsList.map((song) => (
              <div key={song.id} className='pb-0 mb-0 pt-2 d-flex justify-content-between border-bottom '>
                <Link
                  href={route("songs.show", { id: song.id })}
                  className='song-link'>
                  <h5 className='pe-5'>{song.title}</h5>
                </Link>
                  {song.is_private == 0 ? <p className='fs-6 txtGrey '>public</p> : <p className='fs-6 txtGrey'>private</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>Nessuna canzone trovata</p>
        )}
      </div>
    </Layout>
  );
};


