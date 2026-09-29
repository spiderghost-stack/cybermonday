import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CyberMonday",
  description: "How we collect, use and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-cyber-light min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-cyber-main tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: September 29, 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8 text-gray-600 leading-relaxed">
          {[
            { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, address) when you create an account, place an order, or contact us. We also collect usage data such as pages visited and products viewed." },
            { title: "2. How We Use Your Information", content: "We use your information to process orders, provide customer support, send promotional communications (with your consent), improve our services, and comply with legal obligations." },
            { title: "3. Data Sharing", content: "We do not sell your personal data. We may share data with service providers who help us operate our platform (payment processors, shipping partners), always under strict confidentiality agreements." },
            { title: "4. Cookies", content: "We use cookies to keep your cart, remember your preferences, and analyze site traffic. You can control cookies through your browser settings. Essential cookies cannot be disabled." },
            { title: "5. Data Security", content: "We implement industry-standard security measures including SSL encryption, access controls, and regular security audits to protect your personal information." },
            { title: "6. Your Rights (GDPR)", content: "You have the right to access, correct, delete, or export your personal data at any time. You can also object to certain types of processing. Contact us at privacy@cybermonday.com to exercise your rights." },
            { title: "7. Data Retention", content: "We retain your data for as long as necessary to provide our services and comply with legal requirements. Order data is kept for 10 years for accounting purposes." },
            { title: "8. Contact", content: "For privacy-related questions, contact our Data Protection Officer at privacy@cybermonday.com or write to us at CyberMonday, Paris, France." },
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
