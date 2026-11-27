import { useState } from 'react';
import { PAST_PROJECTS } from '../data/shopData';
import { PastProject } from '../types';
import { ResilientImage } from './ResilientImage';

interface PastProjectsViewProps {
  onSelectProject: (project: PastProject) => void;
  onOrderCustom: () => void;
}

const ARCHIVE_FILTERS = [
  'all batches',
  'weddings & events',
  'brand mascots',
  'pet portraits',
  'desk totems',
] as const;

export function PastProjectsView({ onSelectProject, onOrderCustom }: PastProjectsViewProps) {
  const [filter, setFilter] = useState<(typeof ARCHIVE_FILTERS)[number]>('all batches');

  const visibleProjects =
    filter === 'all batches'
      ? PAST_PROJECTS
      : PAST_PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="w-full px-5 md:px-10 py-10 max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] mb-2">
            ★ the unroooled museum
          </span>
          <h1 className="font-headline-lg lowercase font-extrabold text-on-surface tracking-tight">
            past projects hall of fame
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-xl mt-1">
            Over 500 custom commissions baked since 2023. Click any Polaroid tile to inspect the
            clay recipe, batch count, and client story.
          </p>
        </div>

        <button
          type="button"
          onClick={onOrderCustom}
          className="px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-label-md lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary transition-all flex items-center gap-2 self-start md:self-end"
        >
          <span className="material-symbols-outlined text-[18px]">palette</span>
          <span>start your own batch ✎</span>
        </button>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {ARCHIVE_FILTERS.map((item) => {
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-full font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] transition-all ${
                active
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Polaroid Archive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {visibleProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelectProject(project)}
            className={`text-left bg-surface-container-lowest p-4 pb-6 rounded-[2rem] shadow-[4px_4px_0px_#1b1836] ${project.rotationClass} hover:rotate-0 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3`}
          >
            <div className="w-full aspect-[4/3] rounded-[1.25rem] bg-surface-container-low overflow-hidden">
              <ResilientImage
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-headline-sm lowercase text-on-surface">{project.title}</h2>
              <span className={`font-label-sm ${project.batchColorClass}`}>{project.batchCode}</span>
            </div>
            <p className="font-body-sm text-on-surface-variant">{project.summary}</p>
            <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between font-label-sm lowercase text-on-surface-variant">
              <span>{project.pieceCount}</span>
              <span className="text-primary">read batch story →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
