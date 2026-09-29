import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | CyberMonday",
  description: "Frequently asked questions about orders, shipping and returns.",
};

const faqs = [
  { q: "When does the Cyber Monday sale start?", a: "Our Cyber Monday sale runs on November 30th, 2026. Some deals may go live earlier — sign up to our newsletter to get notified first." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number. You can also find tracking info in your account under 'My Orders'." },
  { q: "Can I change or cancel my order?", a: "You can cancel or modify your order within 1 hour of placing it. After that, the order may already be in processing. Contact support as soon as possible." },
  { q: "Is my payment information secure?", a: "Yes. We use industry-standard SSL encryption and never store your full card details. Payments are processed through certified, secure payment partners." },
  { q: "Do you offer price matching?", a: "We offer price matching on identical items sold by major retailers. Contact us with proof of the lower price within 7 days of your purchase." },
  { q: "How do I return an item?", a: "Visit our Returns page for step-by-step instructions. Most items can be returned within 30 days for a full refund." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, PayPal, and bank transfers. More payment options will be available soon." },
  { q: "Can I shop without creating an account?", a: "Yes, guest checkout is available. However, creating an account lets you track orders, save your wishlist, and access exclusive deals." },
];

export default function FaqPage() {
  return (
    <div className="bg-cyber-light min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-cyber-main tracking-tight mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-lg mb-12">Can't find an answer? <a href="/contact" className="text-cyber-promo hover:underline font-medium">Contact our support team.</a></p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border border-gray-100 group">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-cyber-main list-none">
                {faq.q}
                <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform text-xl">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
