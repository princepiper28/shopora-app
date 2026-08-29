// components/Footer.tsx
import {
  ShoppingBag,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] text-white px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-7 h-7 text-white" />
              <span className="text-xl font-bold">Shopora</span>
            </div>

            <p className="text-gray-400 mb-5 text-sm leading-relaxed">
              Your one-stop destination for premium fashion and cutting-edge
              electronics.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                Facebook,
                Twitter,
                Instagram,
                Youtube,
              ].map((Icon, index) => (
                <button
                  key={index}
                  aria-label="Social link"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Shop</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[
                "Fashion",
                "Electronics",
                "Shoes",
                "Accessories",
                "New Arrivals",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[
                "Contact Us",
                "FAQs",
                "Shipping Info",
                "Returns",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[
                "About Us",
                "Careers",
                "Privacy Policy",
                "Terms of Service",
                "Sitemap",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Shopora. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
