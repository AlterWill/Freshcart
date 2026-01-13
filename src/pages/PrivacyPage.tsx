import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-theme-primary mb-6">Privacy Policy</h1>
      <p className="text-theme-muted mb-8">Last updated: January 12, 2026</p>

      <div className="space-y-8 text-theme-secondary leading-relaxed">
        <section>
            <h2 className="text-xl font-bold text-theme-primary mb-4">1. Information We Collect</h2>
            <p className="mb-4">
                We collect information you provide directly to us. For example, we collect information when you create an account, subscribe, participate in any interactive features of our services, fill out a form, request customer support or otherwise communicate with us.
            </p>
            <p>
                The types of information we may collect include your name, email address, postal address, credit card information and other contact or identifying information you choose to provide.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-theme-primary mb-4">2. How We Use Your Information</h2>
            <p>
                We use the information we collect to provide, maintain, and improve our services, such as to administer your account, process your registration, and send you technical notices, updates, security alerts and support and administrative messages.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-theme-primary mb-4">3. Security</h2>
            <p>
                Freshcart takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
