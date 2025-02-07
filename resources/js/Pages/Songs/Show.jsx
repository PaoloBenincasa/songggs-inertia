import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function Show({ song, artist }){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { auth } = usePage().props; // auth.user dovrebbe essere l'utente autenticato
    const spotifyEmbedUrl = song.spotifylink
        ? `https://open.spotify.com/embed/track/${song.spotifylink}?utm_source=generator&theme=0`
        : null;

    return (
        <Layout>
            <div className="vh-100 d-flex flex-column align-items-center justify-content-start pt-5">
                <Head title={song.title} />

                <h1 className="mb-2 undergreen">{song.title}</h1>
                <p>by {artist.stage_name}</p>

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

                {spotifyEmbedUrl && (
                    <iframe
                        style={{ borderRadius: "12px" }}
                        src={spotifyEmbedUrl}
                        width="35%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="mb-4"
                    ></iframe>
                )}

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
                        href={route("mycatalog")}
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


