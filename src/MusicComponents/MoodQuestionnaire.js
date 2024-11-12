import React from 'react';

const MoodQuestionnaire = ({ onMoodSelect }) => {
  return (
    <div className="mood-questionnaire">
      <h2>How Are You Feeling?</h2>
      <select onChange={(e) => onMoodSelect(e.target.value)}>
        <option value="">Select your mood</option>
        <option value="calm">Calm</option>
        <option value="relaxed">Relaxed</option>
        <option value="focused">Focused</option>
        <option value="uplifted">Uplifted</option>
      </select>
    </div>
  );
};

export default MoodQuestionnaire;
