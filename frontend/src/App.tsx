import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navBar';
import Entrate from './pages/Entrate';
import Spese from './pages/Spese';

function App() {
return (
    <>
      <Navbar /> 
      
      <main>
        <Routes>
          <Route path="/" element={<Entrate />} />
          <Route path="/Entrate" element={<Entrate />} />
          <Route path="/Spese" element={<Spese />} />
          <Route path="/Fondi" element={<Entrate />} />
        </Routes>
      </main>
    </>
  );
}

export default App;