import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURES, CATEGORIES, PRODUCTS } from '../placeholder/data';
import Button from '../components/common/Button';
import ProductCard from '../components/common/ProductCard';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative bg-theme-surface rounded-2xl overflow-hidden shadow-sm border border-theme mx-auto">
        <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left space-y-8 z-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-light)] rounded-full">
              Free Shipping - orders over $50
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-theme-primary leading-tight">
              Fresh Organic Food <br />
              <span className="text-[var(--brand-primary)]">Delivered to You</span>
            </h1>
            <p className="text-theme-secondary text-lg md:w-3/4 leading-relaxed">
              Get the best quality and most delicious grocery food in the world,
              delivered directly to your doorstep.
            </p>
            <div className="pt-2">
              <Link to="/shop">
                <Button size="lg" className="shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center relative">
             <div className="absolute inset-0 bg-[var(--brand-light)]/20 blur-3xl rounded-full transform scale-75"></div>
             <img 
               src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
               alt="Grocery Basket" 
               onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found" }}
               className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
             />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="bg-theme-surface p-8 rounded-xl shadow-sm border border-theme flex flex-col items-center text-center hover:shadow-md transition-all">
            <div className="text-4xl mb-4 bg-theme-surface-2 p-4 rounded-full">{feature.icon}</div>
            <div>
              <h3 className="font-bold text-theme-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-theme-secondary">{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Categories */}
      <section>
        <h2 className="text-3xl font-bold text-theme-primary mb-8">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.slice(0, 6).map((cat, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="bg-theme-surface rounded-xl h-40 overflow-hidden mb-4 relative shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-[var(--brand-primary)]">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found" }}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <p className="text-center font-bold text-theme-secondary group-hover:text-[var(--brand-primary)] transition-colors text-lg">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

       {/* Best Sellers */}
      <section>
        <div className="flex justify-between items-end mb-8">
           <h2 className="text-3xl font-bold text-theme-primary">Best Sellers</h2>
           <Link to="/shop">
             <Button variant="ghost" size="sm">View All &rarr;</Button>
           </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
           {PRODUCTS.slice(0, 4).map((item) => (
             <ProductCard key={item.id} product={item} />
           ))}
        </div>
      </section>
      
      {/* Promo Banner */}
    </div>
  );
};

export default HomePage;
