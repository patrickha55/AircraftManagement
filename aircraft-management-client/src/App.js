import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Aircraft from './pages/aircraft/Aircraft';

function App() {
    return (
        <div className="App">
            <Header />
            <Route exact path="/aircraft">
                <Aircraft />
            </Route>
            <Route path="/Roles">
            </Route>
        </div>
    );
}

export default App;
