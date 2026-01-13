import React from 'react';

const PaymentPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-theme-primary mb-8">Payment Methods</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-theme-surface p-8 rounded-xl border border-theme">
            <h3 className="font-bold text-lg text-theme-primary mb-4">Accepted Credit Cards</h3>
            <div className="flex space-x-4 mb-4">
               <div className="w-16 h-10 bg-theme-surface-2 rounded flex items-center justify-center text-xs font-bold text-theme-secondary border border-theme">VISA</div>
               <div className="w-16 h-10 bg-theme-surface-2 rounded flex items-center justify-center text-xs font-bold text-theme-secondary border border-theme">AMEX</div>
               <div className="w-16 h-10 bg-theme-surface-2 rounded flex items-center justify-center text-xs font-bold text-theme-secondary border border-theme">MC</div>
            </div>
            <p className="text-sm text-theme-secondary">
               We accept Visa, MasterCard, and American Express. Your card information is securely processed via Stripe.
            </p>
         </div>

         <div className="bg-theme-surface p-8 rounded-xl border border-theme">
            <h3 className="font-bold text-lg text-theme-primary mb-4">Digital Wallets</h3>
             <div className="flex space-x-4 mb-4">
               <div className="w-16 h-10 bg-theme-surface-2 rounded flex items-center justify-center text-xs font-bold text-theme-secondary border border-theme">PayPal</div>
               <div className="w-16 h-10 bg-theme-surface-2 rounded flex items-center justify-center text-xs font-bold text-theme-secondary border border-theme">Apple</div>
            </div>
            <p className="text-sm text-theme-secondary">
               Speed up your checkout by using Apple Pay, Google Pay, or PayPal.
            </p>
         </div>
      </div>
    </div>
  );
};

export default PaymentPage;