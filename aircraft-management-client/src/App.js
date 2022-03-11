import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import TestHookContext from './components/testState/testHookContext';
import Context from './context/context';
import Aircraft from './pages/aircraft/Aircraft';

function App() {
    /**
     * Testing
     */
    const [state, setState] = useState("Some text");

    const changeText = () => {
        setState("Some other text");
    };


    // end test

    return (
        <div className="App">

            <Header />
            <Route exact path="/aircraft">
                <Aircraft />
            </Route>
            <Route path="/Roles">
            </Route>
            <Context.Provider value={{
                changeTextProp: changeText,
                stateProp: state
            }}>
                <TestHookContext />
            </Context.Provider>
        </div>
    );
}

export default App;
