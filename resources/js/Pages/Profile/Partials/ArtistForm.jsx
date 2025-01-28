import React from 'react';
import { useForm } from '@inertiajs/react';

const ArtistForm = () => {
  const { data, setData, post, processing, errors } = useForm({
    stage_name: '',
    avatar: null,
    bio: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/artists', {
      data,
    });
  };

  return (
    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
      <h2 className="text-xl font-semibold leading-tight text-gray-800">
        Inserisci i dati dell'artista
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
            required
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
        <button type="submit" className="btn btn-success">
          Salva
        </button>
      </form>
    </div>
  );
};

export default ArtistForm;