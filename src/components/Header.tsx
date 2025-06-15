import React, { useState } from 'react';
import { Search, Menu, X, User, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  onSearch: (query: string) => void;
  onAuthRequired: (mode?: 'signin' | 'signup') => void;
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onAuthRequired, onCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, signOut } = useAuth();
  const { cartCount } = useCart();

  const navigationItems = [
    'Home',
    'Kitchen & Home',
    'Tech & Gadgets',
    'Fashion & Travel',
    'Health & Beauty',
    'Baby & Family',
    'Pets & Outdoors',
    'Auto & DIY',
    'Office & Stationery'
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-gray-600">
          <span>Free shipping on orders over $50</span>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:text-primary-600"
                >
                  <User className="h-4 w-4" />
                  <span>{user.user_metadata?.full_name || user.email}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => onAuthRequired('signin')} className="hover:text-primary-600">Sign In</button>
                <span>|</span>
                <button onClick={() => onAuthRequired('signup')} className="hover:text-primary-600">Create Account</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-900">Luminvera</h1>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">Home</a>
            <button onClick={onCartOpen} className="relative text-gray-700 hover:text-primary-600">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-primary-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden py-3 border-t border-gray-200">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for products..."
                className="w-full pl-4 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Categories - scrollable on mobile */}
        <div className="border-t border-gray-200 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 lg:space-x-8">
            {navigationItems.map((item) => (
              <button key={item} className="whitespace-nowrap text-sm text-gray-700 hover:text-primary-600 font-medium">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <button
                key={item}
                className="block w-full text-left text-gray-700 hover:text-primary-600 font-medium py-2"
              >
                {item}
              </button>
            ))}
            <div className="border-t pt-3 mt-4 space-y-2">
              {user ? (
                <button onClick={handleSignOut} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button onClick={() => onAuthRequired('signin')} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              )}
              <button onClick={onCartOpen} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <ShoppingBag className="h-5 w-5" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
