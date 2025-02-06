import Layout from '@/Layouts/Layout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';


export default function Show({ artist, songs }) {
    const [songsList, setSongsList] = useState([]);
    const [publicSongs, setPublicSongs] = useState([]);
    const [privateSongs, setPrivateSongs] = useState([]);
    const { message } = usePage().props;

    useEffect(() => {
        setSongsList(songs);
        let privSongs = [];
        let pubSongs = [];

        songs.forEach(element => {
            if (element.is_private === 0) {
                pubSongs.push(element);
            } else if (element.is_private === 1) {
                privSongs.push(element);
            }
        });
        
        setPublicSongs(pubSongs);
        setPrivateSongs(privSongs);
    }, [songs]);

    

    return (
        <Layout>

            <div className='vh-100 d-flex flex-column align-items-center justify-content-start'>
                <Head title={artist.stage_name} />
                <img src={`/storage/${artist.avatar}`} alt={artist.stage_name} className='proPic mt-5' />
                <h1 className='mt-2 undergreen'>{artist.stage_name}</h1>
                <p>{artist.bio}</p>
                {/* <img src={artist.avatar} alt={artist.stage_name} /> */}
                <p>you have {publicSongs.length} public songs and {privateSongs.length} private songs</p>
                {message && <p>{message}</p>}
                {songsList && songsList.length > 0 ? (
                    <div className='p-3 mt-1 songCatalog'>
                        {songsList.map((song) => (
                            <div key={song.id} className='d-flex justify-content-between'>
                                <Link
                                    href={route("songs.show", { id: song.id })}
                                    className='song-link'>
                                    <h5>{song.title}</h5>
                                </Link>
                                {song.is_private == 0 ? <p className='fs-6 txtGrey songPrivacyPub '>public</p> : <p className='fs-6 songPrivacyPriv txtGrey'>private</p>}
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