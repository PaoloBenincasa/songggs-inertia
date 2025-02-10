import Layout from '@/Layouts/Layout';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';


export default function Show({ artist, songs }) {
    const { message, auth } = usePage().props;

    console.log("Auth:", auth);
    console.log("Auth User:", auth?.user);
    console.log("Auth User Artist:", auth?.user?.artist);


    return (
        <Layout>
            <div className='vh-100 d-flex flex-column align-items-center justify-content-start childHeight'>
                <Head title={artist.stage_name} />
                <img src={`/storage/${artist.avatar}`} alt={artist.stage_name} className='proPic mt-5' />
                <h1 className='mt-2 undergreen'>{artist.stage_name}</h1>
                <p>{artist.bio}</p>

                {auth?.user?.artist ? (
                    <div>
                        <p className='mb-1'>{songs.filter(song => song.is_private === 0).length} <span className='undergreen'>public</span> songs</p>
                        <p>{songs.filter(song => song.is_private === 1).length} <span className='undercontrast'>private</span> songs</p>
                    </div>
                ) : (
                    <p className='mb-1'>{songs.filter(song => song.is_private === 0).length} songs</p>
                )}

                {message && <p>{message}</p>}
                {songs.length > 0 ? (
                    <div className='p-3 mt-1 songCatalog'>
                        {songs.map((song) => (
                            <div key={song.id} className='d-flex justify-content-between'>
                                <Link href={route("songs.show", { id: song.id })} className='song-link'>
                                    <h5>{song.title}</h5>
                                </Link>
                                {song.is_private == 0 ?
                                    <p className='fs-6 txtGrey songPrivacyPub'>public</p> :
                                    <p className='fs-6 songPrivacyPriv txtGrey'>private</p>
                                }
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