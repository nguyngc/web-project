import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ArticleDetail from './pages/ArticleDetail';
import ServiceDetail from './pages/ServiceDetail';
import BookApp from './pages/BookApp';
import ConfirmApp from './pages/ConfirmApp';

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
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="news" element={<Articles />} />
          <Route path="news/1" element={<ArticleDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="bookApp" element={<BookApp />} />
          <Route path="confirm" element={<ConfirmApp />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;