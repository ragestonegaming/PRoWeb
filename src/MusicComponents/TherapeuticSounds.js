import React from 'react';

const TherapeuticSounds = ({ setPlaylist, onBack }) => {
  const sounds = [
    { name: 'Rain', url: '/sounds/rain.mp3' },
    { name: 'Ocean Waves', url: '/sounds/ocean_waves.mp3' },
    { name: 'Forest Ambience', url: '/sounds/forest.mp3' },
    { name: 'Wind Chimes', url: '/sounds/wind_chimes.mp3' },
  ];

  const playSound = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="therapeutic-sounds">
      <button onClick={onBack} className="back-button">Back to Options</button>
      <h2>Therapeutic Sounds</h2>
      <ul>
        {sounds.map((sound, index) => (
          <li key={index}>
            {sound.name}
            <button onClick={() => playSound(sound.url)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TherapeuticSounds;
