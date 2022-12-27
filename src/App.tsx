import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './features/Home';
import Login from './features/Auth/Login';

function App() {
  let cbId = localStorage.getItem('cbId');
  let role = localStorage.getItem('role');
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
