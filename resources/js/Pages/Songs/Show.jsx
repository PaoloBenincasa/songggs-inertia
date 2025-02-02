import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

const Show = ({ song }) => {
    // Costruisce l'URL per l'iframe di Spotify
    const spotifyEmbedUrl = song.spotifylink
        ? `https://open.spotify.com/embed/track/${song.spotifylink}?utm_source=generator&theme=0`
        : null;

    return (
        <Layout>

            <div className="vh-100 d-flex flex-column align-items-center justify-content-start pt-5">
                <Head title={song.title} />

                <h1 className="text-2xl font-bold mb-4">{song.title}</h1>

                {/* Testo della canzone */}
                <p className="whitespace-pre-wrap text-gray-700">{song.lyrics}</p>
                {/* Embed Spotify */}
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


                {/* Pulsante per tornare alla lista */}
                <div className="mt-6">
                    <Link
                        href={route("songs.index")}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                    >
                        Torna alla lista
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Show;


