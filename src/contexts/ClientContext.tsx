import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Lawyer, SortConfig } from '../types';
import { generateId } from '../utils/helpers';

interface ClientContextType {
  clients: Client[];
  lawyers: Lawyer[];
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  addLawyer: (name: string) => void;
  updateLawyer: (id: string, data: Partial<Lawyer>) => void;
  deleteLawyer: (id: string) => void;
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(() => {
    const savedClients = localStorage.getItem('clients');
    return savedClients ? JSON.parse(savedClients) : [];
  });

  const [lawyers, setLawyers] = useState<Lawyer[]>(() => {
    const savedLawyers = localStorage.getItem('lawyers');
    return savedLawyers ? JSON.parse(savedLawyers) : [];
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'createdAt',
    direction: 'desc',
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('lawyers', JSON.stringify(lawyers));
  }, [lawyers]);

  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setClients((prevClients) => [...prevClients, newClient]);
  };

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, ...clientData } : client
      )
    );
  };

  const deleteClient = (id: string) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== id));
  };

  const getClient = (id: string) => {
    return clients.find((client) => client.id === id);
  };

  const addLawyer = (name: string) => {
    const newLawyer: Lawyer = {
      id: generateId(),
      name,
      active: true,
      createdAt: new Date().toISOString(),
    };
    setLawyers((prevLawyers) => [...prevLawyers, newLawyer]);
  };

  const updateLawyer = (id: string, data: Partial<Lawyer>) => {
    setLawyers((prevLawyers) =>
      prevLawyers.map((lawyer) =>
        lawyer.id === id ? { ...lawyer, ...data } : lawyer
      )
    );
  };

  const deleteLawyer = (id: string) => {
    setLawyers((prevLawyers) => prevLawyers.filter((lawyer) => lawyer.id !== id));
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        lawyers,
        addClient,
        updateClient,
        deleteClient,
        getClient,
        addLawyer,
        updateLawyer,
        deleteLawyer,
        sortConfig,
        setSortConfig,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};