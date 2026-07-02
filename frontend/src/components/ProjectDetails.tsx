import { Project } from '../types';

type ProjectDetailsProps = {
  project: Project | null;
};

function ProjectDetails({ project }: ProjectDetailsProps) {
  if (!project) {
    return (
      <section className="card">
        <h3>Dettaglio progetto</h3>
        <p>Seleziona un progetto per vedere i dettagli.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h3>Dettaglio progetto</h3>
      <p>
        <strong>Titolo:</strong> {project.title}
      </p>
      <p>
        <strong>Responsabile:</strong> {project.owner}
      </p>
      <p>
        <strong>Stato:</strong> {project.status}
      </p>
    </section>
  );
}

export default ProjectDetails;
