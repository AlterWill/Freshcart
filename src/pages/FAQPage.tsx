import React, { useState } from 'react';
import { FAQS } from '../placeholder/data';

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-theme-primary mb-8 text-center">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
            <FAQItem key={idx} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </div>
  );
};

const FAQItem: React.FC<{question: string, answer: string}> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-theme rounded-lg overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left bg-theme-surface hover:bg-theme-surface-2 focus:outline-none transition-colors"
            >
                <span className="font-bold text-theme-primary">{question}</span>
                <span className={`text-[var(--brand-primary)] transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className="p-4 bg-theme-surface-2 text-theme-secondary border-t border-theme text-sm leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    );
};

export default FAQPage;