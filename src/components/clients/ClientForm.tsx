import React, { useState, useEffect } from 'react';
import { Client } from '../../types';
import { Input, Checkbox, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { useClients } from '../../contexts/ClientContext';

interface ClientFormProps {
  initialData?: Partial<Client>;
  onSubmit: (data: Omit<Client, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const legalActionTypes = [
  { value: 'civil', label: 'Direito Civil' },
  { value: 'family', label: 'Direito de Família' },
  { value: 'labor', label: 'Direito Trabalhista' },
  { value: 'criminal', label: 'Direito Criminal' },
  { value: 'consumer', label: 'Direito do Consumidor' },
  { value: 'tax', label: 'Direito Tributário' },
  { value: 'administrative', label: 'Direito Administrativo' },
  { value: 'social-security', label: 'Direito Previdenciário' },
  { value: 'business', label: 'Direito Empresarial' },
  { value: 'environmental', label: 'Direito Ambiental' },
  { value: 'other', label: 'Outro' },
];

const ClientForm: React.FC<ClientFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { lawyers } = useClients();
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    isPartnership: false,
    partnerName: '',
    serviceDate: new Date().toISOString().split('T')[0],
    legalActionType: '',
    contractClosed: false,
    documentsSent: false,
    documentSentDate: '',
    documentsReceived: false,
    documentsReceivedDate: '',
    assignedLawyer: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Reset partner name when isPartnership changes to false
  useEffect(() => {
    if (!formData.isPartnership && formData.partnerName) {
      setFormData((prev) => ({ ...prev, partnerName: '' }));
    }
  }, [formData.isPartnership]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear validation error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Nome do cliente é obrigatório';
    }

    if (formData.isPartnership && !formData.partnerName?.trim()) {
      newErrors.partnerName = 'Nome do parceiro é obrigatório quando há parceria';
    }

    if (!formData.serviceDate) {
      newErrors.serviceDate = 'Data do atendimento é obrigatória';
    }

    if (!formData.legalActionType) {
      newErrors.legalActionType = 'Tipo de ação é obrigatório';
    }

    if (formData.documentsSent && !formData.documentSentDate) {
      newErrors.documentSentDate = 'Data de envio do documento é obrigatória';
    }

    if (formData.documentsReceived && !formData.documentsReceivedDate) {
      newErrors.documentsReceivedDate = 'Data de recebimento do documento é obrigatória';
    }

    if (!formData.assignedLawyer) {
      newErrors.assignedLawyer = 'Advogado designado é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData as Omit<Client, 'id' | 'createdAt'>);
    }
  };

  const activeLawyers = lawyers.filter(lawyer => lawyer.active);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome do Cliente"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          error={errors.name}
          fullWidth
          required
        />

        <div className="flex flex-col space-y-4">
          <Checkbox
            label="Contrato de Parceria"
            name="isPartnership"
            checked={formData.isPartnership || false}
            onChange={handleChange}
          />

          {formData.isPartnership && (
            <Input
              label="Nome do Parceiro"
              name="partnerName"
              value={formData.partnerName || ''}
              onChange={handleChange}
              error={errors.partnerName}
              fullWidth
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Data do Atendimento"
          name="serviceDate"
          type="date"
          value={formData.serviceDate || ''}
          onChange={handleChange}
          error={errors.serviceDate}
          fullWidth
          required
        />

        <Select
          label="Tipo de Ação"
          name="legalActionType"
          value={formData.legalActionType || ''}
          onChange={handleChange}
          options={legalActionTypes}
          error={errors.legalActionType}
          fullWidth
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4">
          <Checkbox
            label="Contrato Fechado"
            name="contractClosed"
            checked={formData.contractClosed || false}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4">
          <Checkbox
            label="Documentos Enviados"
            name="documentsSent"
            checked={formData.documentsSent || false}
            onChange={handleChange}
          />

          {formData.documentsSent && (
            <Input
              label="Data de Envio"
              name="documentSentDate"
              type="date"
              value={formData.documentSentDate || ''}
              onChange={handleChange}
              error={errors.documentSentDate}
              fullWidth
            />
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <Checkbox
            label="Documentos Recebidos"
            name="documentsReceived"
            checked={formData.documentsReceived || false}
            onChange={handleChange}
          />

          {formData.documentsReceived && (
            <Input
              label="Data de Recebimento"
              name="documentsReceivedDate"
              type="date"
              value={formData.documentsReceivedDate || ''}
              onChange={handleChange}
              error={errors.documentsReceivedDate}
              fullWidth
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Advogado Designado"
          name="assignedLawyer"
          value={formData.assignedLawyer || ''}
          onChange={handleChange}
          options={activeLawyers.map(lawyer => ({
            value: lawyer.name,
            label: lawyer.name
          }))}
          error={errors.assignedLawyer}
          fullWidth
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;