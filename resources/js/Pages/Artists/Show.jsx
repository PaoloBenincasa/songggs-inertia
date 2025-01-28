
import { Head, Link } from '@inertiajs/react';

export default function Show({ artist }) {
    return (
        <div>
            <Head title={artist.stage_name} />
            <h1>{artist.stage_name}</h1>
            <p>{artist.bio}</p>
            <img src={artist.avatar} alt={artist.stage_name} />
        </div>
    );
}