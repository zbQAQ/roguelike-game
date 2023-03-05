import React from 'react';
import MapContainer from '@/components/MapContainer';
import PlayContainer from '@/components/PlayerContainer';
import EnemyContainer from '@/components/EnemyContainer';

function App() {
  return (
    <div className="App">
      <MapContainer />
      <PlayContainer />
      <EnemyContainer />
    </div>
  );
}

export default App;
