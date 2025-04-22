import React, { useState } from 'react';
import { Input, Checkbox } from '../ui/Input';
import { Button } from '../ui/Button';

interface LawyerFormProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export const LawyerForm: React.FC<LawyerFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Nome do advogado é obrigatório');
      return;
    }

    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome do Advogado"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');
        }}
        error={error}
        fullWidth
        required
      />

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default LawyerForm;