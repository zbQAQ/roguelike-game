import React from 'react';
import MapContainer from '@/components/MapContainer';
import PlayContainer from '@/components/PlayerContainer';
import EnemyContainer from '@/components/EnemyContainer';
import ThrowingObjectContainer from '@/components/ThrowingObjectContainer';
import Fsp from './components/Fps';

function App() {
  return (
    <div className="App">
      <MapContainer />
      <PlayContainer />
      <EnemyContainer />
      <ThrowingObjectContainer />
      <Fsp />
    </div>
  );
}

export default App;
