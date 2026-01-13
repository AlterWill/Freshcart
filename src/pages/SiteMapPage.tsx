import React from 'react';
import { Link } from 'react-router-dom';

const SiteMapPage: React.FC = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Deals', path: '/deals' },
    { name: 'Product Details (Demo)', path: '/product/1' },
    { name: 'Cart', path: '/cart' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Shipping & Returns', path: '/shipping' },
    { name: 'Payment Methods', path: '/payment' },
    { name: '404 Not Found', path: '/random-broken-link' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-theme-primary mb-8">Site Map</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className="block p-4 bg-theme-surface rounded-lg border border-theme hover:border-[var(--brand-primary)] hover:shadow-md transition-all group"
          >
            <span className="font-semibold text-theme-primary group-hover:text-[var(--brand-primary)]">
              {link.name}
            </span>
            <span className="block text-xs text-theme-muted mt-1 font-mono">
              {link.path}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SiteMapPage;