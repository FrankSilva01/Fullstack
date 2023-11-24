// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './component/Form';
import TodosCadastros from './component/TodosCadastros';
import Menu from './component/Menu';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Formulario />} />
          <Route path="/todos-cadastros" element={<TodosCadastros />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
