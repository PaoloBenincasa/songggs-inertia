import Layout from '@/Layouts/Layout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ artist }) {
    return (
        <Layout>

            <div className='vh-100 d-flex flex-column align-items-center justify-content-start'>
                <Head title={artist.stage_name} />
                <img src={`/storage/${artist.avatar}`} alt={artist.stage_name} className='proPic mt-5' />
                <h1 className='mt-2'>{artist.stage_name}</h1>
                <p>{artist.bio}</p>
                {/* <img src={artist.avatar} alt={artist.stage_name} /> */}

            </div>
        </Layout>
    );
}