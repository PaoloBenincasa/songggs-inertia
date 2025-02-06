import { Head } from "@inertiajs/react"
import './ArtistCard.css'

export default function ArtistCard({artist}) {
    

    return (
        <div className='cardBody d-flex flex-column align-items-center justify-content-start mt-3'>
            <Head title={artist.stage_name} />
            <img src={`/storage/${artist.avatar}`} alt={artist.stage_name} className='cardPic mt-5' />
            <h5 className='mt-2 cardName'>{artist.stage_name}</h5>
            <p>{artist.bio}</p>
            {/* <img src={artist.avatar} alt={artist.stage_name} /> */}

        </div>
    )
}