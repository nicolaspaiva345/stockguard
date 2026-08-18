import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;