import React from 'react';
import ClientList from '../components/clients/ClientList';

const ClientListPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gerenciar Clientes</h1>
      <ClientList />
    </div>
  );
};

export default ClientListPage;