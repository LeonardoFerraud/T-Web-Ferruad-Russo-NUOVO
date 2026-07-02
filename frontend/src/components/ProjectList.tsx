import { Project } from '../types';

type ProjectListProps = {
  projects: Project[];
  onSelect: (projectId: number) => void;
};

function ProjectList({ projects, onSelect }: ProjectListProps) {
  return (
    <section className="card">
      <h3>Progetti</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.title}</strong> — {project.status}
            <div>
              <button type="button" onClick={() => onSelect(project.id)}>
                Seleziona
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectList;
