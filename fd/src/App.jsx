import { useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Award,
  ShoppingCart,
  Users,
  CheckCircle,
} from "lucide-react";

export default function App() {
  const [availableQty, setAvailableQty] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch("https://toyafarms.onrender.com/api/stock")
      .then((res) => res.json())
      .then((data) => setAvailableQty(data.availableQty))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://toyafarms.onrender.com/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.availableQty !== undefined) {
          // Update quantity from backend response
          setAvailableQty(data.availableQty);
          setIsSubmitted(true);

          // Build WhatsApp message
          const message = `Hello Toya Farms! 🐷

I would like to pre-order ${quantity}kg of fresh pork.

📋 Order Details:
• Customer: ${name}
• Phone: ${phone}
• Quantity: ${quantity}kg

Please confirm availability and total cost. Thank you!`;

          const whatsappURL = `https://wa.me/2348085944841?text=${encodeURIComponent(
            message
          )}`;

          // Redirect to WhatsApp after short delay
          setTimeout(() => {
            window.open(whatsappURL, "_blank");
            setIsSubmitted(false);
          }, 1500);
        } else {
          alert("Failed to place order. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">Toya Farms</h1>
                <p className="text-sm text-emerald-600">Premium Pork Products</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-emerald-700">
              <Phone size={16} />
              <span className="text-sm font-medium">+234 808 594 4841</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="relative">
            <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-emerald-500 to-lime-500 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-4xl font-bold mb-4">Farm Fresh Pork</h2>
              <p className="text-xl mb-6 opacity-90">
                From Our Farm to Your Fork - Premium Quality Guaranteed
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Award size={16} />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>Fresh Daily</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Local Farm</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            {/* Stock Status */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Current Stock
                </h3>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle size={20} />
                  <span className="font-medium">Available</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700 mb-2">
                  {availableQty}
                </div>
                <div className="text-gray-600">Kilograms Available</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-lime-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((availableQty / 100) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Why Choose Toya Farms?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Premium Quality
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Carefully raised livestock with proper nutrition and care
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Always Fresh
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Processed and delivered within 24 hours of order
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Trusted by Many
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Serving satisfied customers across the region
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Form */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-lime-600 p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <ShoppingCart size={24} />
                  <h3 className="text-2xl font-bold">Place Your Pre-order</h3>
                </div>
                <p className="opacity-90">Secure your fresh pork today</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g., +234 801 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (kg) - Available: {availableQty}kg
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={availableQty}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.min(
                            availableQty,
                            Math.max(1, Number(e.target.value))
                          )
                        )
                      }
                      required
                      className="flex-1 p-4 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(Math.min(availableQty, quantity + 1))
                      }
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Order Summary
                  </h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{quantity} kg</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-600">Order via:</span>
                    <span className="font-medium text-green-600">WhatsApp</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted || quantity > availableQty}
                  className={`w-full p-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isSubmitted
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {isSubmitted ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={20} />
                      <span>Redirecting to WhatsApp...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <ShoppingCart size={20} />
                      <span>Pre-order via WhatsApp</span>
                    </div>
                  )}
                </button>

                <div className="text-center text-xs text-gray-500">
                  <p>You'll be redirected to WhatsApp to complete your order</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <section className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600">Have questions? We're here to help!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
              <p className="text-gray-600">+234 808 594 4841</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Hours</h4>
              <p className="text-gray-600">Mon - Sat: 7AM - 6PM</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
              <p className="text-gray-600">Osogbo, Nigeria</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="font-bold text-gray-800">Toya Farms</span>
          </div>
          <p className="text-gray-600 mb-4">
            Premium pork products from farm to fork
          </p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Toya Farms. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
