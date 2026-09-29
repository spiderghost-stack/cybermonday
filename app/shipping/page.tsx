import type { Metadata } from "next";
import { Truck, Package, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Information | CyberMonday",
  description: "Learn about our shipping options, delivery times, and tracking.",
};

const shippingOptions = [
  { name: "Standard Shipping", time: "5–7 business days", price: "Free on orders over $35", icon: Truck },
  { name: "Express Shipping", time: "2–3 business days", price: "$9.99", icon: Package },
  { name: "Next Day Delivery", time: "1 business day", price: "$19.99", icon: Clock },
];

export default function ShippingPage() {
  return (
    <div className="bg-cyber-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-cyber-main tracking-tight mb-3">Shipping Information</h1>
        <p className="text-gray-500 text-lg mb-12">Everything you need to know about delivery.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {shippingOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.name} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="bg-cyber-promo/10 p-4 rounded-full inline-block mb-4">
                  <Icon className="w-7 h-7 text-cyber-promo" />
                </div>
                <h3 className="font-bold text-cyber-main mb-1">{opt.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{opt.time}</p>
                <p className="text-sm font-bold text-cyber-main">{opt.price}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-cyber-main mb-3">Tracking your order</h2>
            <p className="text-gray-600 leading-relaxed">Once your order ships, you'll receive a confirmation email with a tracking number. You can use this to track your package on our website or the carrier's website.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-cyber-main mb-3">International Shipping</h2>
            <p className="text-gray-600 leading-relaxed">We currently ship to France, Belgium, Switzerland, and Canada. International orders may be subject to customs duties and taxes which are the responsibility of the recipient.</p>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">Shipping times are estimates and may vary during peak periods such as Cyber Monday. Orders placed before 2pm are processed the same business day.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
