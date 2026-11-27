import { PastProject } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: PastProject | null;
  onClose: () => void;
  onOrderSimilar: (project: PastProject) => void;
}

export function ProjectModal({ project, onClose, onOrderSimilar }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-surface-container-lowest rounded-[2.5rem] p-6 md:p-8 shadow-[6px_6px_0px_#1b1836] grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-surface-container hover:bg-secondary-container text-on-surface shadow-[2px_2px_0px_#1b1836] transition-all"
        >
          <span className="material-symbols-outlined text-[20px] block">close</span>
        </button>

        <div className="md:col-span-6">
          <div className="aspect-[4/3] md:aspect-square rounded-[1.5rem] bg-surface-container-low overflow-hidden shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)]">
            <ResilientImage
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm lowercase shadow-[1px_1px_0px_#1b1836]">
                {project.batchCode}
              </span>
              <span className="font-label-sm lowercase text-on-surface-variant">
                {project.category}
              </span>
            </div>

            <h3 className="font-headline-md lowercase text-on-surface pr-6">{project.title}</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              {project.fullStory}
            </p>

            <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5 font-label-sm lowercase text-on-surface-variant">
              <div className="flex justify-between">
                <span>batch size</span>
                <span className="text-on-surface">{project.pieceCount}</span>
              </div>
              <div className="flex justify-between">
                <span>surface coat</span>
                <span className="text-on-surface">{project.glaze}</span>
              </div>
              <div className="flex justify-between">
                <span>studio turnaround</span>
                <span className="text-primary">{project.turnaround}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onOrderSimilar(project);
              onClose();
            }}
            className="w-full py-3 rounded-full bg-primary-container text-on-primary-container font-label-md lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">palette</span>
            <span>commission a similar batch ✎</span>
          </button>
        </div>
      </div>
    </div>
  );
}
