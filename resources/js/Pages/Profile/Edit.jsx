import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ArtistForm from './Partials/ArtistForm';
import NavLink from '@/Components/NavLink';


export default function Edit({ mustVerifyEmail, status, auth, artist }) {
    const artistId = artist.id;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <ArtistForm
                            className="max-w-xl"
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
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
