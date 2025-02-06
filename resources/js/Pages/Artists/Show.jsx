import Layout from '@/Layouts/Layout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';


export default function Show({ artist, songs }) {
    const [songsList, setSongsList] = useState([]);
    const {message } = usePage().props;

    useEffect(() => {
        // console.log('Songs:', songs);
        setSongsList(songs);
    }, [songs]);

    return (
        <Layout>

            <div className='vh-100 d-flex flex-column align-items-center justify-content-start'>
                <Head title={artist.stage_name} />
                <img src={`/storage/${artist.avatar}`} alt={artist.stage_name} className='proPic mt-5' />
                <h1 className='mt-2 undergreen'>{artist.stage_name}</h1>
                <p>{artist.bio}</p>
                {/* <img src={artist.avatar} alt={artist.stage_name} /> */}
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
}