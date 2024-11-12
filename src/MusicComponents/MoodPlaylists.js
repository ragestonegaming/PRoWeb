import React from 'react';

const MoodPlaylists = ({ mood, setPlaylist, onBack }) => {
  const playlists = {
    calm: [{ name: 'Calm Ocean', url: '/music/calm_ocean.mp3' }],
    relaxed: [{ name: 'Lofi Beats', url: '/music/lofi_beats.mp3' }],
    focused: [{ name: 'Focus Now', url: '/music/focus_now.mp3' }],
    uplifted: [{ name: 'Happy Vibes', url: '/music/happy_vibes.mp3' }],
  };

  const playTrack = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="mood-playlists">
      <button onClick={onBack} className="back-button">Back to Options</button>
      <h2>Playlists for {mood.charAt(0).toUpperCase() + mood.slice(1)}</h2>
      <ul>
        {playlists[mood]?.map((track, index) => (
          <li key={index}>
            {track.name}
            <button onClick={() => playTrack(track.url)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodPlaylists;
