import React, { useState } from 'react';
import { Instagram, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Luminvera</h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted global store
              <br />
              for everyday essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Shop Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home & Kitchen</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gadgets & Tech</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fashion & Travel</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Baby & Kids</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="..."/>
                </svg>
                <span>TikTok</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                contact@luminvera.com
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="border-t border-gray-800 mt-12 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start sm:items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Newsletter</h3>
              <p className="text-gray-400">
                Stay updated with our latest products and exclusive deals
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full sm:flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Luminvera. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
