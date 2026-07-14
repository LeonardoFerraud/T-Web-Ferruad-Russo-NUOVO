import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navBar';
import Entrate from './pages/Entrate';

function App() {
return (
    <>
      <Navbar /> 
      
      <main>
        <Routes>
          <Route path="/" element={<Entrate />} />
          <Route path="/Entrate" element={<Entrate />} />
          <Route path="/Spese" element={<Entrate />} />
          <Route path="/Fondi" element={<Entrate />} />
        </Routes>
      </main>
    </>
  );
}

export default App;