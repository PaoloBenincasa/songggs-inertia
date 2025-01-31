import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ArtistEdit({ artist }) {
    const { data, setData, put, processing, errors } = useForm({
        stage_name: artist.stage_name || '',
        bio: artist.bio || '',
        avatar: null,
    });

    const [preview, setPreview] = useState(artist.avatar ? `/storage/${artist.avatar}` : null);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('avatar', file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/artists/${artist.id}`, {
            data,
        });
    };
    
    

    return (
        <div className="max-w-lg mx-auto p-6  shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Modifica Profilo Artista</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div>
                    <label className="block font-medium">Nome d'arte</label>
                    <input
                        type="text"
                        name="stage_name"
                        value={data.stage_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.stage_name && <p className="text-red-500 text-sm">{errors.stage_name}</p>}
                </div>

                <div>
                    <label className="block font-medium">Biografia</label>
                    <textarea
                        name="bio"
                        value={data.bio}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                </div>

                <div>
                    <label className="block font-medium">Avatar</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                    />
                    {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />}
                    {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {processing ? 'Salvando...' : 'Aggiorna'}
                </button>
            </form>
        </div>
    );
}
