import React from 'react';
import { STATS, TEAM_MEMBERS } from '../placeholder/data';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-theme-primary">Empowering Freshness</h1>
        <p className="text-xl text-theme-secondary">
          We are on a mission to deliver fresh, organic, and locally sourced food to every household.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-theme py-12">
        {STATS.map((stat, idx) => (
            <div key={idx}>
                <div className="text-4xl font-bold text-[var(--brand-primary)] mb-2">{stat.value}</div>
                <div className="text-theme-secondary font-medium">{stat.label}</div>
            </div>
        ))}
      </section>

      {/* Story */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-theme-surface-2 rounded-2xl h-96 flex items-center justify-center text-theme-muted font-medium">
            About Us Image
        </div>
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-theme-primary">Our Story</h2>
            <p className="text-theme-secondary leading-relaxed">
                Started in 2016, Freshcart began with a simple idea: what if you could get farm-fresh produce delivered to your door without the hassle? 
                From our humble beginnings as a small local delivery service, we have grown into a nationwide network connecting farmers directly to consumers.
            </p>
            <p className="text-theme-secondary leading-relaxed">
                We believe in sustainability, fair trade, and the joy of cooking with quality ingredients. Every product on our shelf is hand-picked and quality checked.
            </p>
        </div>
      </section>

      {/* Team */}
      <section>
          <h2 className="text-3xl font-bold text-theme-primary mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="bg-theme-surface rounded-xl overflow-hidden border border-theme hover:shadow-lg transition-shadow">
                    <div className="h-64 bg-theme-surface-2 flex items-center justify-center text-theme-muted">Photo</div>
                    <div className="p-4 text-center">
                        <h3 className="font-bold text-theme-primary">{member.name}</h3>
                        <p className="text-sm text-[var(--brand-primary)]">{member.role}</p>
                    </div>
                </div>
            ))}
          </div>
      </section>
    </div>
  );
};

export default AboutPage;