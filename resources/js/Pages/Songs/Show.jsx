import React from "react";
import { Head, Link } from "@inertiajs/react";

const Show = ({ song }) => {
    

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Head title={song.title} />

            <h1 className="text-2xl font-bold mb-4">{song.title}</h1>
            
            {/* Embed Spotify */}
           
            {/* Testo della canzone */}
            <p className="whitespace-pre-wrap text-gray-700">{song.lyrics}</p>

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
    );
};

export default Show;

