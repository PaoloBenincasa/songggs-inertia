import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ArtistForm from './Partials/ArtistForm';
import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';


export default function Edit({ mustVerifyEmail, status, auth, artist }) {
    const artistId = artist.id;
    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div>
                <div>
                    <div>
                        <ArtistForm
                            
                            user={auth.user}
                        />
                    </div>
                    {/* <a href="{{ route('artists.show', ['artist' => auth()->user()->artist->id]) }}">Vai al tuo profilo pubblico</a> */}
                    <NavLink
                        href={route('artists.show', [
                            artistId // o qualsiasi altro valore che rappresenti l'ID dell'artista
                        ])}
                    >
                        Vedi profilo artista
                    </NavLink>
                    <div >
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            
                        />
                    </div>

                    <div >
                        <UpdatePasswordForm />
                    </div>

                    <div >
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
