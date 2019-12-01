import React from 'react';
import Wizard from './components/Wizard';

const App = () => {  
  return (<>
      <h1 className="app-header">D&D 5e Character Wizard</h1>
      <main className="app-container">
        <article className="wizard">
          <Wizard />
        </article>
      </main>
    </>);
};

export default App;
