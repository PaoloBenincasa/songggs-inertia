import { useForm } from 'react-hook-form';
import { usePage } from '@inertiajs/inertia-react';

const SongForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        lyrics: '',
        is_private: false,
        cover: null,
        audio: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/songs', {
            data,
        });
    };

    const { auth } = usePage().props;

    return (
        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Inserisci i dati della canzone
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor="title">Titolo</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />
                    {errors.title && <span>{errors.title}</span>}
                </div>
                <div>
                    <label htmlFor="lyrics">Testo</label>
                    <textarea
                        id="lyrics"
                        name="lyrics"
                        value={data.lyrics}
                        onChange={(e) => setData('lyrics', e.target.value)}
                        required
                    ></textarea>
                    {errors.lyrics && <span>{errors.lyrics}</span>}
                </div>
                <div>
                    <label htmlFor="is_private">Canzone privata</label>
                    <input
                        type="checkbox"
                        id="is_private"
                        name="is_private"
                        checked={data.is_private}
                        onChange={(e) => setData('is_private', e.target.checked)}
                    />
                </div>
                <div>
                    <label htmlFor="cover">Copertina</label>
                    <input
                        type="file"
                        id="cover"
                        name="cover"
                        accept="image/*"
                        onChange={(e) => setData('cover', e.target.files[0])}
                        required
                    />
                    {errors.cover && <span>{errors.cover}</span>}
                </div>
                <button type="submit" disabled={processing}>
                    {processing ? 'Caricamento...' : 'Crea canzone'}
                </button>
            </form>
        </div>
    );
};

export default SongForm;