import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Aircraft from './pages/Aircraft';

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
