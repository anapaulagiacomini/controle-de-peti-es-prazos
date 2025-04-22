/*
  # Initial Schema Setup

  1. New Tables
    - `lawyers`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `active` (boolean, default true)
      - `created_at` (timestamp with time zone)

    - `clients`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `is_partnership` (boolean, default false)
      - `partner_name` (text)
      - `service_date` (date, not null)
      - `legal_action_type` (text, not null)
      - `contract_closed` (boolean, default false)
      - `documents_sent` (boolean, default false)
      - `document_sent_date` (date)
      - `documents_received` (boolean, default false)
      - `documents_received_date` (date)
      - `assigned_lawyer` (text, not null)
      - `created_at` (timestamp with time zone)
      - `user_id` (uuid, not null, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create lawyers table
CREATE TABLE lawyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id)
);

-- Create clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  is_partnership boolean DEFAULT false,
  partner_name text,
  service_date date NOT NULL,
  legal_action_type text NOT NULL,
  contract_closed boolean DEFAULT false,
  documents_sent boolean DEFAULT false,
  document_sent_date date,
  documents_received boolean DEFAULT false,
  documents_received_date date,
  assigned_lawyer text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies for lawyers table
CREATE POLICY "Users can manage their own lawyers"
  ON lawyers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for clients table
CREATE POLICY "Users can manage their own clients"
  ON clients
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);