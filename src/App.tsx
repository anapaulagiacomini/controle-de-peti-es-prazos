import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';
import { PrivateRoute } from './components/PrivateRoute';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import ClientListPage from './pages/ClientListPage';
import ClientFormPage from './pages/ClientFormPage';
import LawyerManagementPage from './pages/LawyerManagementPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <ClientProvider>
                  <div className="flex flex-col min-h-screen bg-gray-50">
                    <Header />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/clients" element={<ClientListPage />} />
                        <Route path="/clients/new" element={<ClientFormPage />} />
                        <Route path="/clients/:id/edit" element={<ClientFormPage />} />
                        <Route path="/lawyers" element={<LawyerManagementPage />} />
                      </Routes>
                    </main>
                    <footer className="bg-indigo-900 text-white py-4">
                      <div className="container mx-auto px-4 text-center text-sm">
                        <p>Controle de Petições e Prazos &copy; {new Date().getFullYear()}</p>
                      </div>
                    </footer>
                  </div>
                </ClientProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;