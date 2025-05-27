export default function Footer() {
  return (
    <footer className="bg-[#344e41] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">ShopSphere</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for all your needs. Quality products at
              affordable prices with fast delivery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">All Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Featured Items</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Deals & Promotions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Gift Cards</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Track Order</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Our Story</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2023 ShopSphere. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
