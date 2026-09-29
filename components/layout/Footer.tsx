import Link from "next/link";
import { Globe, MessageSquare, Share2, MonitorPlay } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cyber-main text-cyber-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyber-white">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/deals?category=Computers" className="hover:text-cyber-promo transition-colors">Computers</Link></li>
              <li><Link href="/deals?category=Phones" className="hover:text-cyber-promo transition-colors">Phones</Link></li>
              <li><Link href="/deals?category=Gaming" className="hover:text-cyber-promo transition-colors">Gaming</Link></li>
              <li><Link href="/deals?category=TV+%26+Home+Theater" className="hover:text-cyber-promo transition-colors">TV</Link></li>
              <li><Link href="/deals?category=Audio" className="hover:text-cyber-promo transition-colors">Audio</Link></li>
              <li><Link href="/deals?category=Accessories" className="hover:text-cyber-promo transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyber-white">Help</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-cyber-promo transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="hover:text-cyber-promo transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-cyber-promo transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-cyber-promo transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyber-white">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-cyber-promo transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-cyber-promo transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-cyber-promo transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-cyber-promo transition-colors">Terms</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyber-white">Follow us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-cyber-promo transition-colors" aria-label="Social 1">
                <Globe className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyber-promo transition-colors" aria-label="Social 2">
                <MessageSquare className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyber-promo transition-colors" aria-label="Social 3">
                <Share2 className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyber-promo transition-colors" aria-label="Social 4">
                <MonitorPlay className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CyberMonday. All rights reserved. Demo Site.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
