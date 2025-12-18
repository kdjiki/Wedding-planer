import { Facebook, Instagram, Mail } from "lucide-react"
import "../globals.css"


export function Footer() {
  const quickLinks = ["Browse Services", "How It Works", "Pricing", "Blog"]
  const support = ["Help Center", "Contact Us", "FAQs", "Terms & Privacy"]

  return (
    <footer className="bg-footer-background text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Wedora Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FF69B4] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-xl">Wedora</span>
            </div>
            <p className="text-gray-300 text-sm">Your wedding, simplified</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-[#FF69B4] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-[#FF69B4] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-[#FF69B4] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-[#FF69B4] transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF69B4]"
              />
              <button className="px-4 py-2 bg-[#FF69B4] rounded-lg hover:bg-[#FF1493] transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300 text-center text-gray-300 text-sm">
          <p>&copy; 2025 Wedora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
