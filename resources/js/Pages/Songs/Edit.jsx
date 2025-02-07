import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Edit({ song }){
    const { data, setData, patch, processing, errors, delete: destroy } = useForm({
        title: song.title,
        lyrics: song.lyrics,
        spotifylink: song.spotifylink || '',
        is_private: song.is_private,
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.spotifylink) {
            delete data.spotifylink;
        }

        patch(route('songs.update', song.id));
    };

    const handleDelete = () => {
        if (confirm('Sei sicuro di voler eliminare questa canzone?')) {
            destroy(route('songs.destroy', song.id));
        }
    };

    return (
        <Layout>
            <Head title={`Modifica ${song.title}`} />

            <div className="container mt-5 pb-5 d-flex justify-content-center align-items-center">
                <form onSubmit={handleSubmit}>
                    <h1>Modifica Canzone</h1>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titolo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                        />
                        {errors.title && <div className="text-danger">{errors.title}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lyrics" className="form-label">Testo</label>
                        <textarea
                            className="form-control"
                            id="lyrics"
                            name="lyrics"
                            rows="5"
                            value={data.lyrics}
                            onChange={handleChange}
                        />
                        {errors.lyrics && <div className="text-danger">{errors.lyrics}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="spotifylink" className="form-label">Link Spotify</label>
                        <input
                            type="url"
                            className="form-control"
                            id="spotifylink"
                            name="spotifylink"
                            value={data.spotifylink}
                            onChange={handleChange}
                        />
                        {errors.spotifylink && <div className="text-danger">{errors.spotifylink}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Privacy</label>
                        <select
                            className="form-select"
                            value={data.is_private}
                            onChange={(e) => setData('is_private', e.target.value)}
                        >
                            <option value={0}>Public</option>
                            <option value={1}>Private</option>
                        </select>
                        {errors.is_private && <div className="text-danger">{errors.is_private}</div>}
                    </div>

                    <button type="submit" className="btn btn-green me-2" disabled={processing}>
                        {processing ? 'Saving...' : 'Update'}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                        Delete song
                    </button>
                    <div>
                        <Link href={route('mycatalog')} className="btn btn-secondary mt-3">back to your catalog</Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};


