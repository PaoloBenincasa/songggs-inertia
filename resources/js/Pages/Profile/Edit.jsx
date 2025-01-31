import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ArtistForm from './Partials/ArtistForm';
import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';

export default function Edit({ mustVerifyEmail, status, auth, artist }) {
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
                        <ArtistForm artist={artist ? artist : null} />
                    </div>

                    {artist && (
                        <NavLink href={route('artists.show', [artist.id])}>
                            Vedi profilo artista
                        </NavLink>
                    )}

                    <div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div>
                        <UpdatePasswordForm />
                    </div>

                    <div>
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

