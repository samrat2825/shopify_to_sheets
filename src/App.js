import { useState } from 'react';
import { Route, BrowserRouter, Routes as Switch } from 'react-router-dom';
import { store } from './redux/Store/store';

//Pages
import SignUpPage from './pages/SignUpPage';
import LoadingPage from './pages/LoadingPage';
import Dashboard from './pages/Dashboard';

const App = () => {
  const currentState = store.getState();
  const [refresh, refresher] = useState(0);

  store.subscribe(() => {
    refresher(refresh + 1);
  });

  if (currentState.loading && currentState.user === null) {
    return <LoadingPage />;
  } else if (currentState.loggedIn) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' element={<Dashboard />} />
          {/* <Route path='/myaccount' element={<MyAccount />} /> */}
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' element={<SignUpPage />} />
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;
