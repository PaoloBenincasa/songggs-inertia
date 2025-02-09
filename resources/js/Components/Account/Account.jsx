import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import './Account.css';


export default function Account() {
    const { auth, artist } = usePage().props;

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    return (
        
            <div className='account-container'>
                {auth?.user ? (
                    <div className="dropdown">
                        <a className="dropdown-toggle link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {auth.user.name}
                            {/* <i className="bi bi-person-circle fs-3 "></i> */}
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
                        <a className="dropdown-toggle text-decoration-none" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
        
    );
};

