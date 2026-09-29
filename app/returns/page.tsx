import type { Metadata } from "next";
import { Undo2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Refunds | CyberMonday",
  description: "Learn about our easy returns and refund policy.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-cyber-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-cyber-promo/10 p-3 rounded-full">
            <Undo2 className="w-8 h-8 text-cyber-promo" />
          </div>
          <h1 className="text-4xl font-extrabold text-cyber-main tracking-tight">Returns & Refunds</h1>
        </div>
        <p className="text-gray-500 text-lg mb-12">Shop with confidence — returns are easy.</p>

        <div className="bg-white rounded-xl p-8 border border-gray-100 mb-6">
          <h2 className="text-2xl font-bold text-cyber-main mb-6">30-Day Return Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            You have 30 days from the date of delivery to return most items for a full refund. Items must be in their original condition, unused, and in original packaging.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-cyber-main mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Eligible for Returns
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Unopened electronics in original packaging</li>
                <li>• Defective or damaged items</li>
                <li>• Wrong item received</li>
                <li>• Items not as described</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-cyber-main mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" /> Not Eligible
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Opened software or digital codes</li>
                <li>• Personal hygiene items</li>
                <li>• Items damaged by the customer</li>
                <li>• Items returned after 30 days</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-100 mb-6">
          <h2 className="text-xl font-bold text-cyber-main mb-4">How to Return an Item</h2>
          <ol className="space-y-4">
            {["Go to your account and find your order", "Select the item(s) you want to return", "Choose a reason and print your free return label", "Drop off the package at any carrier location"].map((step, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="bg-cyber-main text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                <span className="text-gray-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">Refunds are processed within 3–5 business days after we receive your return. The refund will be issued to your original payment method.</p>
        </div>
      </div>
    </div>
  );
}
