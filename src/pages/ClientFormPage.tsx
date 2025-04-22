import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import ClientForm from '../components/clients/ClientForm';
import { useClients } from '../contexts/ClientContext';
import { Client } from '../types';

const ClientFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const { addClient, updateClient, getClient } = useClients();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | undefined>();
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing && id) {
      const clientData = getClient(id);
      if (clientData) {
        setClient(clientData);
      } else {
        navigate('/clients', { replace: true });
      }
      setLoading(false);
    }
  }, [id, isEditing, getClient, navigate]);

  const handleSubmit = (data: Omit<Client, 'id' | 'createdAt'>) => {
    if (isEditing && id) {
      updateClient(id, data);
    } else {
      addClient(data);
    }
    navigate('/clients');
  };

  const handleCancel = () => {
    navigate('/clients');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <div className="py-8 text-center">
            <p>Carregando...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
      </h1>
      <Card>
        <ClientForm
          initialData={client}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </div>
  );
};

export default ClientFormPage;