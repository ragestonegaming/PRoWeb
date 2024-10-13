import React, { useState, useEffect } from 'react';
import './AmbientSoundscapeBuilder.css'; // Create this CSS file for styles

// Using online links for ambient sounds
const soundsList = [
    { name: 'Rain', src: require('../assets/sounds/rain.mp3') },
    { name: 'Ocean Waves', src: require('../assets/sounds/ocean-waves.mp3') },
    //{ name: 'Forest', src: require('./assets/sounds/forest.mp3') },
    { name: 'Fireplace', src: require('../assets/sounds/fireplace.mp3') },
    //{ name: 'Thunderstorm', src: require('./assets/sounds/thunderstorm.mp3') },
    //{ name: 'Night Sounds', src: require('./assets/sounds/night-sounds.mp3') },
    //{ name: 'Birds', src: require('./assets/sounds/birds.mp3') },
    { name: 'Meditation', src: require('../assets/sounds/meditation.mp3') },
    //{ name: 'Rain on Leaves', src: require('./assets/sounds/rain-on-leaves.mp3') },
    //{ name: 'Wind in Trees', src: require('./assets/sounds/wind-in-trees.mp3') },
    { name: 'River Stream', src: require('../assets/sounds/river-stream.mp3') },
    { name: 'Birds Chirping', src: require('../assets/sounds/birds-chirping.mp3') },
    //{ name: 'Calm Water', src: require('./assets/sounds/calm-water.mp3') },
    //{ name: 'Chirping Crickets', src: require('./assets/sounds/chirping-crickets.mp3') },
    //{ name: 'Gentle Music Box', src: require('./assets/sounds/gentle-music-box.mp3') },
    //{ name: 'Meditative Bells', src: require('./assets/sounds/meditative-bells.mp3') },
    //{ name: 'Underwater Sounds', src: require('./assets/sounds/underwater-sounds.mp3') },
    { name: 'Soft Piano', src: require('../assets/sounds/soft-piano.mp3') },
    { name: 'Soft Rain', src: require('../assets/sounds/soft-rain.mp3') },
    //{ name: 'Gentle Ocean Waves', src: require('./assets/sounds/gentle-ocean-waves.mp3') },
    //{ name: 'Waves Crashing', src: require('./assets/sounds/waves-crashing.mp3') },
    //{ name: 'Deep Forest Ambience', src: require('./assets/sounds/deep-forest-ambience.mp3') },
    { name: 'Water Dripping', src: require('../assets/sounds/water-dripping.mp3') },
    //{ name: 'Wind Blowing', src: require('./assets/sounds/wind-blowing.mp3') },
    //{ name: 'Mountain Stream', src: require('./assets/sounds/mountain-stream.mp3') },
    //{ name: 'Distant Thunder', src: require('./assets/sounds/distant-thunder.mp3') },
    { name: 'Soothing Flute Music', src: require('../assets/sounds/soothing-flute-music.mp3') },
    //{ name: 'Relaxing Harp Music', src: require('./assets/sounds/relaxing-harp-music.mp3') },
    { name: 'Ambient Chimes', src: require('../assets/sounds/ambient-chimes.mp3') },
    { name: 'Heartbeat Sounds', src: require('../assets/sounds/heartbeat-sounds.mp3') },
    //{ name: 'Birds at Dawn', src: require('./assets/sounds/birds-at-dawn.mp3') },
    //{ name: 'Crickets and Night Sounds', src: require('./assets/sounds/crickets-night-sounds.mp3') },
    { name: 'Calming Wind Chimes', src: require('../assets/sounds/calming-wind-chimes.mp3') },
    { name: 'Flowing River', src: require('../assets/sounds/flowing-river.mp3') },
    //*{ name: 'Distant Waterfall', src: require('./assets/sounds/distant-waterfall.mp3') },
    //{ name: 'Ocean Breeze', src: require('./assets/sounds/ocean-breeze.mp3') },
    { name: 'Relaxing Strings', src: require('../assets/sounds/relaxing-strings.mp3') },
    //{ name: 'Gentle Wind', src: require('./assets/sounds/gentle-wind.mp3') },
  ];
  

const AmbientSoundscapeBuilder = () => {
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    const initialSounds = {};
    soundsList.forEach((sound) => {
      const audio = new Audio(sound.src);
      initialSounds[sound.name] = { audio, volume: 0.5, isPlaying: false };
    });
    setSounds(initialSounds);
  }, []);

  const togglePlay = (name) => {
    const sound = sounds[name];
    if (sound.isPlaying) {
      sound.audio.pause();
    } else {
      sound.audio.volume = sound.volume;
      sound.audio.play();
    }
    setSounds((prev) => ({
      ...prev,
      [name]: { ...sound, isPlaying: !sound.isPlaying },
    }));
  };

  const handleVolumeChange = (name, volume) => {
    const sound = sounds[name];
    sound.audio.volume = volume;
    setSounds((prev) => ({
      ...prev,
      [name]: { ...sound, volume },
    }));
  };

  return (
    <div className="soundscape-container">
      <h1>Ambient Soundscape Builder</h1>
      <div className="sound-grid">
        {soundsList.map((sound) => (
          <div key={sound.name} className="sound-item">
            <h2>{sound.name}</h2>
            <button onClick={() => togglePlay(sound.name)}>
              {sounds[sound.name]?.isPlaying ? 'Pause' : 'Play'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sounds[sound.name]?.volume}
              onChange={(e) => handleVolumeChange(sound.name, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbientSoundscapeBuilder;
