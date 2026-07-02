import { useMemo, useState } from 'react';
import ActivityFeed from './ActivityFeed';
import ProjectDetails from './ProjectDetails';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { Project, UserRole } from '../types';

type DashboardProps = {
  user: { username: string; role: UserRole };
  isAdmin: boolean;
  onLogout: () => void;
};

const initialProjects: Project[] = [
  { id: 1, title: 'Analisi requisiti', owner: 'Marco', status: 'In corso' },
  { id: 2, title: 'Mockup UI', owner: 'Sara', status: 'Da fare' }
];

function Dashboard({ user, isAdmin, onLogout }: DashboardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(1);
  const [activities, setActivities] = useState<string[]>(['Benvenuto nel cruscotto']);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  );

  const handleCreateProject = (project: Omit<Project, 'id'>) => {
    const nextProject = {
      id: Date.now(),
      ...project
    };
    setProjects((current) => [nextProject, ...current]);
    setSelectedProjectId(nextProject.id);
    setActivities((current) => [`Creato progetto: ${project.title}`, ...current]);
  };

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setActivities((current) => [`Visualizzato progetto ${projectId}`, ...current]);
  };

  return (
    <div className="grid grid-2">
      <section className="card">
        <h2>Benvenuto, {user.username}</h2>
        <p>Ruolo: {user.role}</p>
        <p>Permessi: {isAdmin ? 'Admin completo' : 'Accesso base'}</p>
        <button type="button" className="secondary" onClick={onLogout}>
          Logout
        </button>
      </section>

      <ProjectForm onCreate={handleCreateProject} />

      <ProjectList projects={projects} onSelect={handleSelectProject} />
      <ProjectDetails project={selectedProject} />
      <ActivityFeed activities={activities} />
    </div>
  );
}

export default Dashboard;
