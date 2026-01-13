import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";

const Footer: React.FC = () => {
  return (
    <footer className="bg-theme-surface border-t border-theme pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Top: Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-theme pb-8 mb-8 gap-4">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-theme-primary mb-1">Join our Newsletter</h3>
            <p className="text-sm text-theme-secondary">Get e-mail updates about our latest shop and <span className="text-yellow-500 font-medium">special offers.</span></p>
          </div>
          <div className="flex w-full md:w-auto items-start gap-2">
            <div className="flex-grow">
               <Input 
                 placeholder="Enter your email address" 
                 className="min-w-[250px] !mb-0"
                 fullWidth
               />
            </div>
            <Button className="!py-3 !px-6">Subscribe</Button>
          </div>
        </div>

        {/* Middle: Grid Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h4 className="text-theme-primary font-bold mb-4">Freshcart</h4>
            <ul className="space-y-2 text-sm text-theme-secondary">
              <li><Link to="/about" className="hover:text-[var(--brand-primary)] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--brand-primary)] transition-colors">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-[var(--brand-primary)] transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-[var(--brand-primary)] transition-colors">News & Blog</Link></li>
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-theme-primary font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-theme-secondary">
              <li><Link to="/shop?cat=Vegetables" className="hover:text-[var(--brand-primary)] transition-colors">Vegetables & Fruits</Link></li>
              <li><Link to="/shop?cat=Breakfast" className="hover:text-[var(--brand-primary)] transition-colors">Breakfast & Instant Food</Link></li>
              <li><Link to="/shop?cat=Bakery" className="hover:text-[var(--brand-primary)] transition-colors">Bakery & Biscuits</Link></li>
              <li><Link to="/shop?cat=Meat" className="hover:text-[var(--brand-primary)] transition-colors">Meat & Fish</Link></li>
            </ul>
          </div>

           {/* Column 3: Help */}
           <div>
            <h4 className="text-theme-primary font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-theme-secondary">
              <li><Link to="/faq" className="hover:text-[var(--brand-primary)] transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-[var(--brand-primary)] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/payment" className="hover:text-[var(--brand-primary)] transition-colors">Payment Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-[var(--brand-primary)] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-theme-primary font-bold mb-4">Get In Touch</h4>
            <div className="space-y-4 text-sm text-theme-secondary">
              <p>support@freshcart.com</p>
              <div className="flex space-x-4 mt-4">
                 {/* Social Placeholders */}
                 <div className="w-8 h-8 bg-theme-surface-2 rounded-full hover:bg-[var(--brand-primary)] hover:text-white cursor-pointer transition-colors flex items-center justify-center text-xs font-bold">FB</div>
                 <div className="w-8 h-8 bg-theme-surface-2 rounded-full hover:bg-[var(--brand-primary)] hover:text-white cursor-pointer transition-colors flex items-center justify-center text-xs font-bold">IG</div>
                 <div className="w-8 h-8 bg-theme-surface-2 rounded-full hover:bg-[var(--brand-primary)] hover:text-white cursor-pointer transition-colors flex items-center justify-center text-xs font-bold">TW</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright & Payment */}
          <div className="border-t border-theme mt-12 pt-8 text-center text-sm text-theme-secondary">
            <p>&copy; {new Date().getFullYear()} Freshcart. All rights reserved.</p>
            <button 
              onClick={() => {
                fetch('/api/time')
                  .then(res => res.json())
                  .then(data => alert(`Server says:\n${data.message}\nTime: ${data.time}`))
                                     .catch(() => alert('Failed to fetch API. (This only works on Vercel or with "vercel dev")'));              }}
              className="mt-2 text-xs text-[var(--brand-primary)] hover:underline"
            >
              Test Serverless Function
            </button>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
