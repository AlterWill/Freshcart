import React from 'react';
import { JOBS } from '../placeholder/data';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const CareersPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-theme-primary mb-6">Join the Freshcart Team</h1>
        <p className="text-xl text-theme-secondary max-w-2xl mx-auto">We are always looking for talented individuals to help us revolutionize online grocery shopping. Build the future of food with us.</p>
      </div>

      <div className="space-y-4">
        {JOBS.map((job, idx) => (
          <div key={idx} className="bg-theme-surface border border-theme p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition-all group">
             <div className="mb-4 md:mb-0 text-center md:text-left">
               <h3 className="text-xl font-bold text-theme-primary group-hover:text-[var(--brand-primary)] transition-colors">{job.title}</h3>
               <div className="text-theme-muted text-sm mt-1 flex items-center justify-center md:justify-start gap-2">
                 <span>{job.dept}</span>
                 <span>•</span>
                 <span>{job.loc}</span>
               </div>
             </div>
             <div className="flex items-center gap-4">
               <Badge variant="success" size="md">{job.type}</Badge>
               <Button variant="outline" size="sm">Apply Now</Button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareersPage;