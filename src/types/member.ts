export interface Member {
  id: string;
  name: string;
  email?: string | null;
  documentId?: string | null;
  taxId?: string | null;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;
  maritalStatus?: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' | 'OTHER' | null;
  birthDate?: Date | null;
  phone?: string | null;
  mobile?: string | null;
  address?: string | null;
  profession?: string | null;
  academicDegree?: string | null;
  school?: string | null;
  fieldOfStudy?: string | null;
  training?: string | null;
}