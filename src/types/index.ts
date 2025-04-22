export interface Client {
  id: string;
  name: string;
  isPartnership: boolean;
  partnerName?: string;
  serviceDate: string;
  legalActionType: string;
  contractClosed: boolean;
  documentsSent: boolean;
  documentSentDate?: string;
  documentsReceived: boolean;
  documentsReceivedDate?: string;
  assignedLawyer: string;
  createdAt: string;
}

export interface Lawyer {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
}

export type SortField = 'name' | 'serviceDate' | 'contractClosed' | 'assignedLawyer' | 'createdAt' | 'legalActionType';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}