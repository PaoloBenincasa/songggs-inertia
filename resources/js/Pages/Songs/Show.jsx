import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import SongEmbed from "@/Components/SongEmbed";

export default function Show({ song, artist }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { auth } = usePage().props; // auth.user dovrebbe essere l'utente autenticato

    console.log(song.audio);  // Verifica il valore

    return (
        <Layout>
            <div className="d-flex flex-column align-items-center justify-content-start pt-5 childHeight">
                <Head title={song.title} />

                <h1 className="mb-2">{song.title}</h1>
                <Link
                    href={route("artists.show", artist.id)}
                    className="link mb-2">
                    {artist.stage_name}
                </Link>
                <div className="song-embed mb-2">
                    <SongEmbed spotifyId={song.spotifylink} />
                </div>
                <div className="mb-2 h-50">

                    {song.audio_url && ( // Use song.audio_url here
                        <audio controls>
                            <source src={song.audio_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    )}



                </div>
                <h6 className="txtGrey">Lyrics</h6>
                <div>
                    {song.lyrics.split("\n").map((line, index) => (
                        <p key={index} className="text-center mb-1">{line}<br /></p>
                    ))}
                </div>

                <button
                    className="btn btn-green mb-4 mt-4"
                    onClick={() => setIsModalOpen(true)}
                >
                    studio mode
                </button>


                <div className="mt-4 mb-1">
                    <Link
                        href={route("songs.edit", song.id)}
                        className="txtGrey home-link"
                    >
                        edit song
                    </Link>
                </div>

                <div className="mt-6 pb-3">
                    <Link
                        href={route("artists.show", artist.id)}
                        className="txtGrey link"
                    >
                        back to catalog
                    </Link>
                </div>




            </div>

            {isModalOpen && (
                <div className="studio position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-newblack bg-opacity-0">
                    <div className="h-100 overflow-auto">
                        {song.lyrics.split("\n").map((line, index) => (
                            <p key={index} className="text-center mb-1 text-uppercase fs-1">
                                {line}<br />
                            </p>
                        ))}
                    </div>
                    <button
                        className="absolute top-0 end-0 btn btn-light fs-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        ✖
                    </button>
                </div>
            )}
        </Layout>
    );
};


