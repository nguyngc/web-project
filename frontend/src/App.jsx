import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the Layout Route */}
        <Route path="/" element={<Layout />}>
          {/* Nested Routes within the Layout */}
          <Route index element={<Home />} /> {/* Default Route */}
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="news" element={<Articles />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;