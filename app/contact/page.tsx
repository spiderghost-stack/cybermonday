import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | CyberMonday",
  description: "Get in touch with our support team.",
};

export default function ContactPage() {
  return (
    <div className="bg-cyber-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-cyber-main tracking-tight mb-3">Contact Us</h1>
          <p className="text-gray-500 text-lg">We're here to help. Reach out anytime.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 flex gap-4">
              <div className="bg-cyber-promo/10 p-3 rounded-full h-fit">
                <Mail className="w-6 h-6 text-cyber-promo" />
              </div>
              <div>
                <h3 className="font-bold text-cyber-main mb-1">Email Support</h3>
                <p className="text-gray-500 text-sm mb-2">We reply within 24 hours.</p>
                <a href="mailto:support@cybermonday.com" className="text-cyber-promo font-semibold hover:underline">
                  support@cybermonday.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 flex gap-4">
              <div className="bg-cyber-promo/10 p-3 rounded-full h-fit">
                <Clock className="w-6 h-6 text-cyber-promo" />
              </div>
              <div>
                <h3 className="font-bold text-cyber-main mb-1">Business Hours</h3>
                <p className="text-gray-500 text-sm">Monday – Friday: 9am – 6pm</p>
                <p className="text-gray-500 text-sm">Saturday: 10am – 4pm</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 flex gap-4">
              <div className="bg-cyber-promo/10 p-3 rounded-full h-fit">
                <MapPin className="w-6 h-6 text-cyber-promo" />
              </div>
              <div>
                <h3 className="font-bold text-cyber-main mb-1">Headquarters</h3>
                <p className="text-gray-500 text-sm">Paris, France</p>
              </div>
            </div>
          </div>

          {/* Contact Form — Client Component */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
