import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  rating?: number;
  reviews?: number;
  image?: string;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-theme-surface border border-theme rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Discount Badge */}
      {product.oldPrice && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm">
          {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
        </span>
      )}

      {/* Image Area */}
      <div className="relative h-48 overflow-hidden bg-theme-surface-2">
        <img 
          src={product.image || "https://placehold.co/400x400?text=No+Image"} 
          alt={product.title}
          onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found" }}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link to={`/product/${product.id}`}>
            <Button variant="secondary" size="sm" className="!rounded-full shadow-lg !bg-white !text-black hover:!bg-gray-100">
               View
            </Button>
          </Link>
          <Button variant="primary" size="sm" className="!rounded-full shadow-lg">
             Add
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-theme-secondary mb-1 font-medium tracking-wide uppercase">
          {product.category}
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-theme-primary mb-2 text-lg hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <span className="text-yellow-400 text-sm">★★★★☆</span>
          <span className="text-xs text-theme-muted ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="mt-auto flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-bold text-xl text-theme-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-theme-muted line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" className="!rounded-lg !py-1.5 !px-3">
            + Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
