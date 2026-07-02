export type UserRole = 'ADMIN' | 'USER';

export interface Project {
  id: number;
  title: string;
  owner: string;
  status: 'Da fare' | 'In corso' | 'Completato';
}
