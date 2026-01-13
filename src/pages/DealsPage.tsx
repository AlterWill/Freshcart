import React from 'react';
import { PRODUCTS } from '../placeholder/data';
import ProductCard from '../components/common/ProductCard';

const DealsPage: React.FC = () => {
  // Simulate deals by adding a fake higher oldPrice to existing products
  const dealProducts = [...PRODUCTS, ...PRODUCTS].slice(0, 8).map((p, idx) => ({
    ...p,
    id: 100 + idx, // Avoid key collisions
    oldPrice: p.price * 1.5, // Fake original price (50% markup = 33% off)
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Banner */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 md:p-12 mb-12 text-center border border-red-100 dark:border-red-900/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 dark:text-red-400 mb-4 relative z-10">Super Flash Sale!</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 relative z-10">Up to 50% off on selected items. Limited time only.</p>
        <div className="inline-block bg-white dark:bg-slate-800 px-8 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 relative z-10">
          <span className="font-mono text-2xl font-bold text-gray-900 dark:text-white tracking-widest">Ends in: 02:14:59</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {dealProducts.map((item) => (
             <ProductCard key={item.id} product={item} />
           ))}
        </div>
    </div>
  );
};

export default DealsPage;