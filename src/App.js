import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles';
import Navbar from './components/Navigation/Navbar';
import HomeScreen from './screens/HomeScreen';
import BuscaScreen from './screens/BuscaScreen';
import RepositoriosScreen from './screens/RepositoriosScreen';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/busca" element={<BuscaScreen />} />
          <Route path="/repositorios/:username" element={<RepositoriosScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
