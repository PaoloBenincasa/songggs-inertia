import { Head, Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <Layout>

            <div className='vh-100 d-flex align-items-center justify-content-center'>
                <section className="hero row w-100 text-end gap-5">
                    {/* Your Hero Content */}
                    <div className="col-5">
                        <h2>
                            <span>
                                <h1 className="mb-0 undergreen">
                                    <i>
                                        Songggs
                                    </i>
                                </h1>
                            </span>
                            your personal musical diary
                        </h2>
                        <h5 className="txtGrey">
                            Ever struggled to keep track of the music you're working on?
                            This is the place for you! Work on your lyrics, store your demos, collaborate with other artists.
                        </h5>
                        <Link href={route('songs.create', [])}>
                            <button className="btn-green mt-3">Start writing!</button>
                        </Link>
                        {/* <div>
                            <small className="txtGrey">don't have an account yet?
                                <Link href={route('register', [])}className="home-link">
                                    <span className=" ms-1 ">join us!</span>
                                </Link>
                            </small>
                        </div> */}
                        {!auth?.user && (
                            <div>
                                <small className="txtGrey">don't have an account yet?
                                    <Link href={route('register', [])} className="home-link">
                                        <span className="ms-1">join us!</span>
                                    </Link>
                                </small>
                            </div>
                        )}

                    </div>
                    <div className="col-3 hero-right">

                    </div>

                </section>
            </div>


        </Layout>
    );
}
