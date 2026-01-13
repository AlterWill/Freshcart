import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../placeholder/data';

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-theme-primary mb-4">Freshcart Blog</h1>
        <p className="text-theme-secondary">Recipes, health tips, and news from the Freshcart team.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
            <article key={post.id} className="group cursor-pointer">
                <div className="h-64 rounded-xl mb-4 overflow-hidden bg-theme-surface-2 flex items-center justify-center border border-theme relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found" }}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <div className="space-y-2">
                    <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wide">{post.category}</span>
                    <h2 className="text-xl font-bold text-theme-primary group-hover:text-[var(--brand-primary)] transition-colors">
                        <Link to="#">{post.title}</Link>
                    </h2>
                    <p className="text-sm text-theme-muted">{post.date} • 5 min read</p>
                </div>
            </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;