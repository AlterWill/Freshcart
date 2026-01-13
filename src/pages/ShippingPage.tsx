import React from 'react';

const ShippingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-theme-primary mb-8">Shipping & Returns</h1>
      
      <div className="space-y-8 text-theme-secondary leading-relaxed">
        <section className="bg-theme-surface p-8 rounded-xl border border-theme">
           <h2 className="text-xl font-bold text-theme-primary mb-4">Shipping Policy</h2>
           <p className="mb-4">
             We strive to deliver your order in the freshest condition possible. 
             Orders placed before 2 PM are typically processed the same day.
           </p>
           <ul className="list-disc pl-5 space-y-2">
             <li><strong>Standard Shipping:</strong> 3-5 business days.</li>
             <li><strong>Express Shipping:</strong> 1-2 business days.</li>
             <li><strong>Same Day Delivery:</strong> Available in select cities for orders over $50.</li>
           </ul>
        </section>

        <section className="bg-theme-surface p-8 rounded-xl border border-theme">
           <h2 className="text-xl font-bold text-theme-primary mb-4">Return Policy</h2>
           <p>
             If you are not 100% satisfied with your purchase, you can return the product and get a full refund or exchange the product for another one, be it similar or not.
             You can return a product for up to 30 days from the date you purchased it.
           </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPage;