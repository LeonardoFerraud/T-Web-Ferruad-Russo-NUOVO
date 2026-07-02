import { useState, type FormEvent } from 'react';
import { Project } from '../types';

type ProjectFormProps = {
  onCreate: (project: Omit<Project, 'id'>) => void;
};

function ProjectForm({ onCreate }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState<Project['status']>('Da fare');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !owner.trim()) return;
    onCreate({ title: title.trim(), owner: owner.trim(), status });
    setTitle('');
    setOwner('');
    setStatus('Da fare');
  };

  return (
    <section className="card">
      <h3>Nuovo progetto</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Titolo
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          Responsabile
          <input value={owner} onChange={(event) => setOwner(event.target.value)} />
        </label>
        <label>
          Stato
          <select value={status} onChange={(event) => setStatus(event.target.value as Project['status'])}>
            <option value="Da fare">Da fare</option>
            <option value="In corso">In corso</option>
            <option value="Completato">Completato</option>
          </select>
        </label>
        <button type="submit">Crea progetto</button>
      </form>
    </section>
  );
}

export default ProjectForm;
