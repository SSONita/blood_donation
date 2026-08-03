import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

// Auth context (auth feature)
import { AuthProvider } from './features/auth/context/AuthContext';

// Shared layouts
import MainLayout from './shared/layouts/MainLayout';
import AuthLayout from './shared/layouts/AuthLayout';

// Feature pages
import Home from './features/home/pages/Home';
import Inventory from './features/inventory/pages/Inventory';
import Request from './features/request/pages/Request';
import History from './features/history/pages/History';
import Education from './features/education/pages/Education';
import Donation from './features/donation/pages/Donation';
import Login from './features/auth/pages/Login';
import SignUp from './features/auth/pages/SignUp';

// Shared pages
import NotFound from './shared/pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main site pages */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="request" element={<Request />} />
            <Route path="history" element={<History />} />
            <Route path="education" element={<Education />} />
            <Route path="donation" element={<Donation />} />
          </Route>

          {/* Auth routes with a different layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
