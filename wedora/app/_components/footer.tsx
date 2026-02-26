import { FaFacebookSquare } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6";
import { Mail } from "lucide-react"

import { quickLinks, support } from "../navigationData";
  


export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] dark:bg-[#0A0A0A] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center md:text-left">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-18 mb-12">
          {/* Wedora Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 bg-[#FF69B4] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm ">W</span>
              </div>
              <span className="font-bold text-xl">Wedora</span>
            </div>
            <p className="text-gray-400 text-sm">Your wedding, simplified</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.path} className="text-gray-400 hover:text-[#FF69B4] transition-colors text-sm">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          {/* <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link.title}>
                  <a href={link.path} className="text-gray-400 hover:text-[#FF69B4] transition-colors text-sm">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-6 justify-center md:justify-start">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center hover:bg-[#FF69B4] transition-colors"
              >
                <FaFacebookSquare size={20} />
              </a>
              < a
                href="#"
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center hover:bg-[#FF69B4] transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
            {/* <div className="flex gap-2 justify-center md:justify-start px-8 sm:px-6 md:px-0">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 dark:bg-gray-900 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF69B4]"
              />
              <button className="px-4 py-2 bg-[#FF69B4] rounded-lg hover:bg-[#FF1493] transition-colors cursor-pointer">
                <Mail size={18} />
              </button>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 dark:border-gray-900 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Wedora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}; 
