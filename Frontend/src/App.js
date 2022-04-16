import React from 'react';
import { Provider } from 'react-redux';
import Board from './components/Board';
import store from './box'


function App() {
    return (
        <Provider box={box}>
             <Board/>
        </Provider>
    
    );
  }
  
  export default App;