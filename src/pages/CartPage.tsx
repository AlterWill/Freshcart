import React from 'react';
import { Link } from 'react-router-dom';
import { CART_ITEMS } from '../placeholder/data';
import Button from '../components/common/Button';

const CartPage: React.FC = () => {
  const subtotal = CART_ITEMS.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = 3.00;
  const total = subtotal + serviceFee;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-theme-primary mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Cart Items Table */}
        <div className="lg:w-2/3">
           <div className="bg-theme-surface rounded-2xl shadow-sm border border-theme overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-theme-surface-2 text-theme-secondary font-semibold uppercase text-xs">
                 <tr>
                   <th className="px-6 py-5">Product</th>
                   <th className="px-6 py-5">Price</th>
                   <th className="px-6 py-5">Quantity</th>
                   <th className="px-6 py-5">Total</th>
                   <th className="px-6 py-5"></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-theme text-theme-primary">
                 {CART_ITEMS.map((item) => (
                   <tr key={item.id} className="hover:bg-theme-surface-2 transition-colors">
                     <td className="px-6 py-5">
                       <div className="flex items-center space-x-4">
                         <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-theme">
                           <img src={item.image} alt={item.title} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found" }} className="w-full h-full object-cover" />
                         </div>
                         <div>
                           <h4 className="font-bold text-theme-primary">{item.title}</h4>
                           <p className="text-sm text-theme-secondary">{item.unit}</p>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-5 font-semibold text-theme-secondary">${item.price.toFixed(2)}</td>
                     <td className="px-6 py-5">
                       <div className="flex items-center border border-theme rounded-lg bg-theme-surface w-32">
                          <button className="px-3 py-1 text-theme-secondary hover:bg-theme-surface-2 transition-colors">-</button>
                          <input type="text" value={item.quantity} className="w-full text-center focus:outline-none bg-transparent font-medium text-theme-primary" readOnly/>
                          <button className="px-3 py-1 text-theme-secondary hover:bg-theme-surface-2 transition-colors">+</button>
                       </div>
                     </td>
                     <td className="px-6 py-5 font-bold text-theme-primary">${(item.price * item.quantity).toFixed(2)}</td>
                     <td className="px-6 py-5 text-right">
                       <button className="text-theme-muted hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                         </svg>
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           <div className="mt-8">
             <Link to="/shop">
               <Button variant="outline" className="font-semibold">
                 &larr; Continue Shopping
               </Button>
             </Link>
           </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:w-1/3">
          <div className="bg-theme-surface rounded-2xl shadow-lg border border-theme p-8 sticky top-24">
            <h2 className="text-2xl font-bold text-theme-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-theme-secondary">
                <span>Item Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-theme-secondary">
                <span>Service Fee</span>
                <span className="font-medium">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-theme-primary text-xl border-t border-theme pt-6 mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button size="lg" fullWidth className="shadow-xl">
              Proceed to Checkout
            </Button>
            
            <p className="text-xs text-theme-muted mt-6 text-center leading-relaxed">
              By placing your order, you agree to be bound by the Freshcart <a href="#" className="underline hover:text-[var(--brand-primary)]">Terms of Service</a> and <a href="#" className="underline hover:text-[var(--brand-primary)]">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
