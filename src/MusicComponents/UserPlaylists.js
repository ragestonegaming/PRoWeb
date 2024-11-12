import React, { useState } from 'react';

const UserPlaylists = ({ playlist, setPlaylist }) => {
  const [userPlaylists, setUserPlaylists] = useState([]);

  const handleSavePlaylist = () => {
    setUserPlaylists([...userPlaylists, playlist]);
    setPlaylist([]); // Clear current playlist after saving
  };

  return (
    <div className="user-playlists">
      <h2>Your Custom Playlists</h2>
      <button onClick={handleSavePlaylist}>Save Current Playlist</button>
      <ul>
        {userPlaylists.map((list, index) => (
          <li key={index}>{list.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPlaylists;
