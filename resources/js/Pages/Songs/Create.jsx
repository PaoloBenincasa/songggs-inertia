// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useState } from 'react';

// const Create = () => {
//   const { register, handleSubmit } = useForm();
//   const [isPrivate, setIsPrivate] = useState(false);


//   const onSubmit = (data) => {
//     const formData = new FormData();
//     formData.append('title', data.title);
//     formData.append('lyrics', data.lyrics);
//     formData.append('is_private', isPrivate ? 1 : 0); // 🔹 Converti in numero (1 o 0)

//     if (data.cover.length > 0) {
//       formData.append('cover', data.cover[0]);
//     }

//     axios.post('/songs', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.error(error);
//         console.log(error.response.data);
//       });
//   };



//   return (
//     <div>
//       <h1>Crea una nuova canzone</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Titolo:</label>
//           <input type="text" {...register('title')} />
//         </div>
//         <div>
//           <label>Testo:</label>
//           <textarea {...register('lyrics')} />
//         </div>
//         <div>
//           <label>Canzone privata:</label>
//           <input
//             type="checkbox"
//             {...register('is_private')}
//             checked={isPrivate}
//             value="1" // 🔹 Forziamo il valore a "1"
//             onChange={(e) => setIsPrivate(e.target.checked)}
//           />
//           <input type="hidden" {...register('is_private')} value={isPrivate ? 1 : 0} />


//         </div>
//         <div>
//           <label>Copertina:</label>
//           <input type="file" {...register('cover')} />
//         </div>
//         <button type="submit">
//           Crea canzone
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Create;

import Layout from '@/Layouts/Layout';
import { useForm } from '@inertiajs/react';

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    lyrics: '',
    is_private: 0,
    cover: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('songs.store'));
  };

  return (
    <Layout>

      <div className="container mt-5 ">
        <h2>Create a New Song</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Lyrics</label>
            <textarea
              className="form-control"
              rows="5"
              value={data.lyrics}
              onChange={(e) => setData('lyrics', e.target.value)}
            ></textarea>
            {errors.lyrics && <div className="text-danger">{errors.lyrics}</div>}
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

          <div className="mb-3">
            <label className="form-label">Cover</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setData('cover', e.target.files[0])}
            />
            {errors.cover && <div className="text-danger">{errors.cover}</div>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing ? 'Saving...' : 'Save Song'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
