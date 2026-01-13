import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../placeholder/data';
import Button from '../components/common/Button';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');

  const product = PRODUCTS.find(p => p.id === Number(id)) || PRODUCTS[0];

  return (
    <div className="container mx-auto px-4 py-8">
       {/* Breadcrumb */}
       <div className="text-sm text-theme-secondary mb-8 font-medium">
         <Link to="/" className="hover:text-[var(--brand-primary)]">Home</Link> 
         <span className="mx-2">/</span> 
         <Link to="/shop" className="hover:text-[var(--brand-primary)]">Shop</Link> 
         <span className="mx-2">/</span> 
         <span className="text-theme-primary">{product.category}</span>
       </div>

       {/* Top Section: Image & Info */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
         {/* Left: Images */}
         <div className="space-y-4">
            <div className="bg-theme-surface rounded-2xl overflow-hidden shadow-sm border border-theme h-[500px] flex items-center justify-center relative">
               <img 
                 src={product.image} 
                 alt={product.title} 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map(thumb => (
                <div key={thumb} className="w-24 h-24 bg-theme-surface rounded-lg border border-theme flex-shrink-0 cursor-pointer hover:border-[var(--brand-primary)] overflow-hidden transition-all">
                   <img 
                     src={product.image} 
                     alt="Thumbnail" 
                     className="w-full h-full object-cover hover:scale-110 transition-transform"
                   />
                </div>
              ))}
            </div>
         </div>

         {/* Right: Details */}
         <div className="flex flex-col justify-center">
            <span className="text-[var(--brand-primary)] font-bold text-sm tracking-wider uppercase mb-3 block">{product.category}</span>
            <h1 className="text-4xl font-extrabold text-theme-primary mb-4 leading-tight">{product.title}</h1>
            
            <div className="flex items-center mb-6">
               <div className="flex text-yellow-400 text-sm">
                 {'★'.repeat(Math.round(product.rating || 5))}{'☆'.repeat(5 - Math.round(product.rating || 5))}
               </div>
               <span className="text-sm text-theme-secondary ml-3 font-medium">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-end mb-8">
              <span className="text-4xl font-bold text-theme-primary">
                ${product.price.toFixed(2)} 
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-theme-muted line-through font-normal ml-3 mb-1">${product.oldPrice.toFixed(2)}</span>
                  <span className="text-sm font-bold text-red-500 ml-4 mb-2 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% Off
                  </span>
                </>
              )}
            </div>

            <hr className="border-theme mb-8" />

            <div className="flex space-x-4 mb-8">
               {/* Quantity */}
               <div className="flex items-center border border-theme rounded-lg bg-theme-surface">
                 <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-theme-secondary hover:bg-theme-surface-2 transition-colors"
                 >-</button>
                 <span className="px-4 py-3 font-bold text-theme-primary w-12 text-center">{quantity}</span>
                 <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-theme-secondary hover:bg-theme-surface-2 transition-colors"
                 >+</button>
               </div>
               {/* Add to Cart */}
               <Button size="lg" className="flex-1 shadow-xl hover:shadow-2xl">
                 Add to Cart
               </Button>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-theme-secondary">
               <p><span className="font-bold text-theme-primary">SKU:</span> {product.sku}</p>
               <p><span className="font-bold text-theme-primary">Availability:</span> <span className="text-[var(--brand-primary)] font-bold">{product.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
               <p><span className="font-bold text-theme-primary">Type:</span> Organic</p>
               <p><span className="font-bold text-theme-primary">Shipping:</span> 01 Day Shipping</p>
            </div>
         </div>
       </div>

       {/* Bottom Section: Tabs */}
       <div className="bg-theme-surface rounded-2xl p-8 border border-theme shadow-sm">
         <div className="border-b border-theme mb-8">
           <nav className="flex space-x-8">
             {['desc', 'info', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-bold border-b-2 transition-all ${
                    activeTab === tab 
                    ? 'border-[var(--brand-primary)] text-[var(--brand-primary)]' 
                    : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme'
                  }`}
                >
                  {tab === 'desc' ? 'Description' : tab === 'info' ? 'Additional Info' : 'Reviews'}
                </button>
             ))}
           </nav>
         </div>

         <div className="text-theme-secondary leading-relaxed text-lg">
           {activeTab === 'desc' && (
             <div>
               <p className="mb-4">{product.description}</p>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
             </div>
           )}
           {activeTab === 'info' && <p>Nutritional values and detailed specs go here.</p>}
           {activeTab === 'reviews' && <p>Customer reviews will be listed here.</p>}
         </div>
       </div>
    </div>
  );
};

export default ProductDetailsPage;
