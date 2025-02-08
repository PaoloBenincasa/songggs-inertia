import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import ArtistCard from '@/Components/ArtistCard/ArtistCard';

export default function Welcome({ auth, laravelVersion, phpVersion, artists, songs = [] }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <Layout>


            {/* <div className='vh-75 d-flex align-items-center justify-content-center'> */}
            <header className="hero  w-100 gap-5 pe-5 pb-5">
                {/* Your Hero Content */}
                <div className='hero-content p-3'>

                    <h2>
                        <span>
                            <h1 className="mb-0 undergreen">
                                <i>
                                    Songggs
                                </i>
                            </h1>
                        </span>
                        your personal musical diary
                    </h2>
                    <h6>
                        Ever struggled to keep track of the music you're working on?
                        This is the place for you! Work on your lyrics, store your demos, collaborate with other artists.
                    </h6>
                    <Link href={route('songs.create', [])}>
                        <button className="btn-green mt-3">Start writing!</button>
                    </Link>
                    {/* <div>
                            <small className="txtGrey">don't have an account yet?
                            <Link href={route('register', [])}className="home-link">
                            <span className=" ms-1 ">join us!</span>
                            </Link>
                            </small>
                            </div> */}
                    {!auth?.user && (
                        <div>
                            <small className="txtGrey">don't have an account yet?
                                <Link href={route('register', [])} className="home-link">
                                    <span className="ms-1">join us!</span>
                                </Link>
                            </small>
                        </div>
                    )}
                </div>



            </header>
            {/* </div> */}
            <section className='artistsContainer'>
                <div className='vh-75 pb-5'>
                    <h5 className='text-center txtGrey pt-5 pb-4'>
                        our artists
                    </h5>
                    <div className='artistsWrapper d-flex justify-content-around pt-3 pb-5'>
                        {artists.length > 0 ? (
                            artists.map(artist => (
                                <ArtistCard key={artist.id} artist={artist} />
                            ))
                        ) : (
                            <p className="text-center">No artists found.</p>
                        )}
                    </div>
                </div>
            </section>
            <section>
                <div className='vh-100'>
                    <h5 className='text-center txtGrey pt-5 pb-4'>
                        our songs
                    </h5>
                    <div className='container-fluid d-flex justify-content-center pt-3'>
                        <div className='row justify-content-between w-50 txtGrey small'>
                            <div className='col-5'>title</div>
                            <div className='col-4'>artist</div>
                            <div className='col-3'>last update</div>
                        </div>
                    </div>
                    <div className='songsWrapper d-flex flex-column pt-3'>
                        {songs.length > 0 ? (
                            songs.map(song => (
                                <div className='container-fluid d-flex justify-content-center'>
                                    <div key={song.id} className='row justify-content-between w-50'>
                                        <Link
                                            href={route("songs.show", { id: song.id })}
                                            className='song-link col-5'>
                                            {song.title}
                                        </Link>
                                        <Link href={route("artists.show", { id: song.artist?.id })}
                                            className='col-4 songlistArtist'>
                                            {song.artist?.stage_name}

                                        </Link>
                                        <p className='col-3 songlistTime'>
                                            {new Date(song.updated_at).toLocaleDateString('it-IT')}
                                        </p>
                                    </div>
                                </div>

                            ))

                        ) : (
                            <p className="text-center">No songs found.</p>
                        )}
                    </div>
                </div>
            </section>


        </Layout>
    );
}
