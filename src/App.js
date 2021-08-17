import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import Startup from './components/Startup/Startup'
import NotFound from './components/NotFound/NotFound'
import Translation from './components/Translation/Translation'
import Profile from './components/Profile/Profile'


function App() {
  return (
    <BrowserRouter>
      <div className="App">


        {/* Here are the routes: */}   
        <Switch>
          <Route path="/" exact component={ Startup } />
          <Route path="/translation" component= { Translation }></Route>
          <Route path="/profile" component= { Profile }></Route>
          <Route path="*" component={ NotFound } />         
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
