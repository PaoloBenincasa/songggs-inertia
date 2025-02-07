import { Head, Link } from "@inertiajs/react"
import './ArtistCard.css'


export default function ArtistCard({ artist }) {


    return (
        <div className='cardBody d-flex flex-column align-items-center justify-content-evenly mt-3'>
            <Head title={artist.stage_name} />
            <img src={`/storage/${artist.avatar}`} alt={artist.stage_name} className='cardPic' />
            <h5 className=' cardName'>{artist.stage_name}</h5>
            <p>{artist.bio}</p>

            <Link
                href={route("artists.show", { id: artist.id })}
                className="profile-link">
                view profile
            </Link>

        </div>
    )
}