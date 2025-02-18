import { Head, Link, useForm } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ArtistForm from './Partials/ArtistForm';
import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';

export default function Edit({ mustVerifyEmail, status, auth, artist }) {
    console.log("auth:", auth);
console.log("auth.artist:", auth?.artist);

    const { delete: destroy, processing } = useForm();

    const handleDeleteArtist = (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete your artist profile?')) {
            destroy(route('artists.destroy', artist.id));
        }
    };

    return (
        <Layout 
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />
            <div className='d-flex childHeight pt-5 justify-content-center align-items-center bg-primary'>

                <div className='h-100 bg-success d-flex flex-column justify-content-center align-items-center'>
                    
                        <div className='w-50'>
                            <ArtistForm artist={artist ? artist : null} />
                        </div>

                        {artist && (
                        <div className="w-50 mt-3">
                            <button 
                                onClick={handleDeleteArtist} 
                                disabled={processing}
                                className="btn btn-danger"
                            >
                                {processing ? 'Deleting artist...' : 'Delete artist'}
                            </button>
                        </div>
                    )}

                        {artist && (
                            <NavLink href={route('artists.show', [artist.id])}>
                                Vedi profilo artista
                            </NavLink>
                        )}

                        <div className='w-50 mt-3'> 
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>

                        <div className='w-50 mt-3'>
                            <UpdatePasswordForm />
                        </div>

                        <div className='w-50 mt-3'>
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            
        </Layout>
    );
}

