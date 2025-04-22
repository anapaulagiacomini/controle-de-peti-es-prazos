import React from 'react';
import LawyerList from '../components/lawyers/LawyerList';

const LawyerManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gerenciar Advogados</h1>
      <LawyerList />
    </div>
  );
};

export default LawyerManagementPage;