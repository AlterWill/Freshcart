import React from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div>
          <h1 className="text-4xl font-bold text-theme-primary mb-6">Get In Touch</h1>
          <p className="text-theme-secondary mb-8 text-lg">
            Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
          </p>
          
          <form className="space-y-6">
             <div className="grid grid-cols-2 gap-6">
                <Input label="First Name" placeholder="John" fullWidth />
                <Input label="Last Name" placeholder="Doe" fullWidth />
             </div>
             <Input label="Email" type="email" placeholder="john@example.com" fullWidth />
             
             <div className="mb-6">
                <label className="block text-sm font-medium text-theme-secondary mb-1.5">Message</label>
                <textarea rows={5} className="block w-full px-4 py-3 rounded-lg bg-theme-surface border border-theme text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition-colors resize-none" placeholder="How can we help?"></textarea>
             </div>
             
             <Button size="lg" fullWidth>Send Message</Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-theme-surface border border-theme rounded-2xl shadow-sm">
                  <h3 className="font-bold text-theme-primary mb-2 text-lg">Customer Support</h3>
                  <p className="text-sm text-theme-secondary mb-2">support@freshcart.com</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;