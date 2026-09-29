import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CyberMonday",
  description: "Read our terms of service and conditions of use.",
};

export default function TermsPage() {
  return (
    <div className="bg-cyber-light min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-cyber-main tracking-tight mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: September 29, 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8 text-gray-600 leading-relaxed">
          {[
            { title: "1. Acceptance of Terms", content: "By accessing or using CyberMonday, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service." },
            { title: "2. Use of the Platform", content: "You agree to use our platform only for lawful purposes. You must not attempt to gain unauthorized access, interfere with the platform's operation, or use it to distribute malware or spam." },
            { title: "3. Account Responsibility", content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately if you suspect unauthorized access." },
            { title: "4. Products and Pricing", content: "We make every effort to display accurate product information and pricing. In the event of a pricing error, we reserve the right to cancel orders placed at the incorrect price and notify you promptly." },
            { title: "5. Orders and Payment", content: "By placing an order, you make an offer to purchase. Your order is confirmed once you receive an order confirmation email. Payment is due at the time of purchase." },
            { title: "6. Intellectual Property", content: "All content on this platform including logos, text, images, and code is the property of CyberMonday or its licensors. You may not reproduce, distribute, or create derivative works without our written permission." },
            { title: "7. Limitation of Liability", content: "To the maximum extent permitted by law, CyberMonday shall not be liable for any indirect, incidental, or consequential damages arising from your use of our platform or products purchased through it." },
            { title: "8. Changes to Terms", content: "We may update these Terms of Service from time to time. We will notify you of significant changes by email or through a prominent notice on our platform. Continued use after changes constitutes acceptance." },
            { title: "9. Governing Law", content: "These terms are governed by the laws of France. Any disputes shall be subject to the exclusive jurisdiction of the courts of Paris, France." },
            { title: "10. Contact", content: "For questions about these Terms, please contact us at legal@cybermonday.com." },
          ].map(({ title, content }) => (
            <div key={title}>
              <h2 className="text-lg font-bold text-cyber-main mb-2">{title}</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
