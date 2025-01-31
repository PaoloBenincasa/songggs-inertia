import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const ArtistForm = ({ artist }) => {
    const [isSubmitted, setIsSubmitted] = useState(false); // Stato per gestire la visibilità del modulo
    const { data, setData, post, put, processing, errors } = useForm({
        id: artist ? artist.id : '',
        stage_name: artist ? artist.stage_name : '',
        avatar: null,
        bio: artist ? artist.bio : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.id) {
            // Modifica di un artista esistente
            put(`/artists/${data.id}`, {
                data,
                forceFormData: true, // Necessario per l'upload di file
                onSuccess: () => setIsSubmitted(true), // Nasconde il modulo dopo il salvataggio
            });
        } else {
            // Creazione di un nuovo artista
            post('/artists', {
                data,
                forceFormData: true, // Necessario per l'upload di file
                onSuccess: () => setIsSubmitted(true), // Nasconde il modulo dopo il salvataggio
            });
        }
    };

    // Se il modulo è stato inviato con successo, mostra un messaggio e un link
    if (isSubmitted) {
        return (
            <div>
                <p>Artista salvato con successo!</p>
                <NavLink href={route('artists.edit', [data.id])}>
                    Modifica di nuovo l'artista
                </NavLink>
            </div>
        );
    }

    // Altrimenti, mostra il modulo
    return (
        <div>
            <h2>
                {artist ? 'Modifica artista' : 'Inserisci i dati dell\'artista'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="stage_name">Nome d'arte</label>
                    <input
                        type="text"
                        id="stage_name"
                        name="stage_name"
                        value={data.stage_name}
                        onChange={(e) => setData('stage_name', e.target.value)}
                        required
                    />
                    {errors.stage_name && <span>{errors.stage_name}</span>}
                </div>
                <div>
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={(e) => setData('avatar', e.target.files[0])}
                        required={!artist} // Non obbligatorio per la modifica
                    />
                    {errors.avatar && <span>{errors.avatar}</span>}
                </div>
                <div>
                    <label htmlFor="bio">Biografia</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        required
                    />
                    {errors.bio && <span>{errors.bio}</span>}
                </div>
                <button type="submit" className="btn btn-success" disabled={processing}>
                    {processing ? 'Salvataggio in corso...' : 'Salva'}
                </button>
            </form>
        </div>
    );
};

export default ArtistForm;