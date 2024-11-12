import React, { useState } from 'react';
import MoodQuestionnaire from '../MusicComponents/MoodQuestionnaire';
import DynamicBackground from '../MusicComponents/DynamicBackground';
import MoodPlaylists from '../MusicComponents/MoodPlaylists';
import TherapeuticSounds from '../MusicComponents/TherapeuticSounds';

const Music = () => {
  const [mood, setMood] = useState('');
  const [view, setView] = useState('questionnaire'); // tracks the current view
  const [playlist, setPlaylist] = useState([]);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    setView('options');
  };

  const handleOptionSelect = (option) => {
    setView(option);
  };

  const handleBackToOptions = () => {
    setView('options'); // go back to options view
  };

  return (
    <div>
      <DynamicBackground mood={mood} />
      {view === 'questionnaire' && <MoodQuestionnaire onMoodSelect={handleMoodSelect} />}
      
      {view === 'options' && (
        <div className="options">
          <h2>Choose Your Preference</h2>
          <button onClick={() => handleOptionSelect('therapeutic')}>Therapeutic Sounds</button>
          <button onClick={() => handleOptionSelect('playlist')}>Mood Playlists</button>
        </div>
      )}
      
      {view === 'therapeutic' && <TherapeuticSounds setPlaylist={setPlaylist} onBack={handleBackToOptions} />}
      {view === 'playlist' && <MoodPlaylists mood={mood} setPlaylist={setPlaylist} onBack={handleBackToOptions} />}
    </div>
  );
};

export default Music;
