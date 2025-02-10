import Layout from '@/Layouts/Layout';
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    lyrics: '',
    is_private: 0,
    cover: null,
    spotifylink: '',
  });
  const { message, auth, artist} = usePage().props;

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('songs.store'));
  };

  console.log("Auth:", auth);
  console.log("Auth User:", auth?.user);
  console.log("Auth User Artist:", auth?.user?.artist);

  return (
    <Layout>
      <div className="container mt-5 pb-5 d-flex justify-content-center align-items-center childHeight ">
        <form onSubmit={handleSubmit} className='mt-5'>
          <h1 className='text-center undergreen'>Create a New Song</h1>
          <div className="mb-3">
            <label className="form-label txtGrey">Title</label>
            <input
              type="text"
              className="form-control"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label txtGrey">Lyrics</label>
            <textarea
              className="form-control"
              rows="15"
              value={data.lyrics}
              onChange={(e) => setData('lyrics', e.target.value)}
            ></textarea>
            {errors.lyrics && <div className="text-danger">{errors.lyrics}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label txtGrey">Privacy</label>
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

          <div className="mb-3">
            <label className="form-label txtGrey">Spotify Link</label>
            <input
              type="url"
              className="form-control"
              value={data.spotifylink}
              onChange={(e) => setData('spotifylink', e.target.value)}
              placeholder="open.spotify.com/track/..."
            />
            {errors.spotifylink && <div className="text-danger">{errors.spotifylink}</div>}
          </div>

          <button type="submit" className="btn btn-green" disabled={processing}>
            {processing ? 'Saving...' : 'Save Song'}
          </button>
        </form>
      </div>
    </Layout>
  );
};


