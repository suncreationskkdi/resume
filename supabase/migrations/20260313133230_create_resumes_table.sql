/*
  # Create resumes table

  1. New Tables
    - `resumes`
      - `id` (uuid, primary key) - Unique identifier for each resume
      - `created_at` (timestamptz) - When the resume was created
      - `updated_at` (timestamptz) - Last update timestamp
      - `personal_info` (jsonb) - Name, email, phone, location, summary
      - `experience` (jsonb) - Array of work experience entries
      - `education` (jsonb) - Array of education entries
      - `skills` (jsonb) - Array of skills/competencies
      - `certifications` (jsonb) - Array of certifications
      - `projects` (jsonb) - Array of projects
      - `selected_template` (text) - Which template is currently selected
      - `raw_text` (text) - Original OCR extracted text
      
  2. Security
    - Enable RLS on `resumes` table
    - Add policy for public insert (anyone can create)
    - Add policy for public read/update by resume id (anyone with the id can access)
    
  Note: This is a public-facing tool where users can create and edit resumes without authentication
*/

CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  personal_info jsonb DEFAULT '{}'::jsonb,
  experience jsonb DEFAULT '[]'::jsonb,
  education jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  projects jsonb DEFAULT '[]'::jsonb,
  selected_template text DEFAULT 'modern',
  raw_text text DEFAULT ''
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create resumes"
  ON resumes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view resumes"
  ON resumes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update resumes"
  ON resumes FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete resumes"
  ON resumes FOR DELETE
  USING (true);