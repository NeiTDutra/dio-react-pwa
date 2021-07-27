import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './containers/Home';

function App() {
  return (
    <main>
      <section>
        <Router>
          <div>
            <Switch>
              <Route path="/">
                <div>
                  <Home/>
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </section>
    </main>
  );
}

export default App;
