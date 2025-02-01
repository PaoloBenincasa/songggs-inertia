export default function SongEmbed({ spotifyId }) {
    if (!spotifyId) return null;

    const embedUrl = `https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0`;

    return (
        <iframe
            style={{ borderRadius: "12px" }}
            src={embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        ></iframe>
    );
}
