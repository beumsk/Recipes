import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.scss';
import Home from './pages/Home';
import Api from './pages/Api';
import Apis from './pages/Apis';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="api">
              <Route index element={<Api />} />
              <Route path=":recipe" element={<Apis />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
