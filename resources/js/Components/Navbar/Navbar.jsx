import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import './Navbar.css';


const Navbar = () => {
    const { auth } = usePage().props;

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    return (
        <nav className='d-flex align-items-center justify-content-between p-3'>
            <div className='w-25'>
                <Link href="/" className='link'>
                    <div className='undergreen fst-italic'>Songggs</div>
                </Link>
            </div>
            <ul className='d-flex align-items-center justify-content-around w-50 nav-center p-0 m-0'>
                <Link
                    href={route('songs.create', [
                    ])}
                    className='link'
                >
                    <li>
                        <i className="bi bi-pen-fill"></i>

                        write
                    </li>
                </Link>
                
                <li>
                    <i className="bi bi-search"></i>
                    search
                </li>
                <Link
                    href={route('mycatalog', [
                    ])}
                    className='link'
                >
                    <li>
                        <i className="bi bi-file-music-fill"></i>
                        catalog
                    </li>
                </Link>
            </ul>
            <div className='w-25 text-end'>
                {auth?.user ? (
                    <div className="dropdown">
                        <a className="dropdown-toggle  txtGrey link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {auth.user.name}
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" onClick={() => Inertia.visit('/profile')}>Update profile</a>
                            </li>
                            <li>
                                <a onClick={handleLogout} className="dropdown-item" href="#">Log out</a>
                            </li>
                        </ul>
                    </div>

                ) : (
                    <div className="dropdown">
                        <a className="dropdown-toggle text-decoration-none txtGrey" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            account
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" onClick={() => Inertia.visit('/login')}>Sign in</a>
                            </li>
                            <li>
                                <a className="dropdown-item" onClick={() => Inertia.visit('/register')}>Sign up</a>
                            </li>
                        </ul>
                    </div>

                )}
            </div>
        </nav>
    );
};

export default Navbar;
