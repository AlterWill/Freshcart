import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../placeholder/data';
import ProductCard from '../components/common/ProductCard';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(100);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('cat');

  // Initialize filters from URL
  useEffect(() => {
    if (categoryQuery) {
       const match = CATEGORIES.find(c => c.name.toLowerCase().includes(categoryQuery.toLowerCase()));
       if (match) {
         setSelectedCategories([match.name]);
       }
    }
  }, [categoryQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS]; // Duplicating for demo

    // 1. Search Filter
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // 3. Price Filter
    result = result.filter(p => p.price <= priceRange);

    return result.slice(0, 12); // Limit for demo
  }, [searchQuery, selectedCategories, priceRange]);


  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      {/* Sidebar - Filters */}
      <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
        <div className="bg-theme-surface p-6 rounded-xl border border-theme shadow-sm transition-colors">
          <h3 className="font-bold text-theme-primary mb-4 text-lg">Categories</h3>
          <ul className="space-y-3">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <li key={cat.name} className="flex items-center group">
                <input 
                  type="checkbox" 
                  id={cat.name} 
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => handleCategoryChange(cat.name)}
                  className="w-4 h-4 rounded border-theme text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] bg-theme-surface-2" 
                />
                <label 
                  htmlFor={cat.name} 
                  className="ml-3 text-theme-secondary cursor-pointer group-hover:text-[var(--brand-primary)] transition-colors"
                >
                  {cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-theme-surface p-6 rounded-xl border border-theme shadow-sm transition-colors">
          <h3 className="font-bold text-theme-primary mb-4 text-lg">Price Range</h3>
           <input
            type="range"
            min="0"
            max="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-theme-surface-2 rounded-lg appearance-none cursor-pointer accent-[var(--brand-primary)]"
          />
          <div className="flex justify-between text-sm text-theme-secondary mt-2 font-medium">
            <span>$0</span>
            <span className="text-theme-primary">${priceRange}</span>
            <span>$100</span>
          </div>
        </div>
      </aside>

      {/* Main Content - Product Grid */}
      <div className="flex-1">
        {/* Header / Sorting */}
        <div className="flex justify-between items-center mb-6 bg-theme-surface p-4 rounded-xl border border-theme shadow-sm transition-colors">
           <p className="text-theme-secondary">
             <span className="font-bold text-theme-primary">{filteredProducts.length}</span> Products Found
             {searchQuery && <span> for "<span className="font-bold text-[var(--brand-primary)]">{searchQuery}</span>"</span>}
           </p>
           <select className="border-theme rounded-lg text-sm focus:ring-[var(--brand-primary)] focus:border-[var(--brand-primary)] p-2.5 bg-theme-surface-2 text-theme-primary outline-none cursor-pointer">
             <option>Sort by: Featured</option>
             <option>Price: Low to High</option>
             <option>Price: High to Low</option>
             <option>Newest Arrivals</option>
           </select>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredProducts.map((product, idx) => (
               <ProductCard key={`${product.id}-${idx}`} product={product} />
             ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-theme-surface rounded-xl border border-dashed border-theme">
             <div className="text-6xl mb-4">🔍</div>
             <h3 className="text-xl font-bold text-theme-primary">No products found</h3>
             <p className="text-theme-secondary">Try adjusting your filters or search terms.</p>
             <button 
               onClick={() => {setSearchParams({}); setSelectedCategories([]); }}
               className="mt-4 text-[var(--brand-primary)] font-semibold hover:underline"
             >
               Clear Filters
             </button>
          </div>
        )}
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center space-x-2">
           <button className="px-4 py-2 border border-theme rounded-lg hover:bg-theme-surface-2 text-theme-secondary disabled:opacity-50 transition-colors">Prev</button>
           <button className="px-4 py-2 border border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white rounded-lg shadow-md">1</button>
           <button className="px-4 py-2 border border-theme rounded-lg hover:bg-theme-surface-2 text-theme-secondary transition-colors">2</button>
           <button className="px-4 py-2 border border-theme rounded-lg hover:bg-theme-surface-2 text-theme-secondary transition-colors">3</button>
           <button className="px-4 py-2 border border-theme rounded-lg hover:bg-theme-surface-2 text-theme-secondary transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;