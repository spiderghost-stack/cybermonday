import type { Metadata } from "next";
import { Zap, Target, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | CyberMonday",
  description: "Learn about our mission to deliver the best tech deals.",
};

export default function AboutPage() {
  return (
    <div className="bg-cyber-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-cyber-main tracking-tight mb-4">
            About <span className="text-cyber-promo">CyberMonday</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Your destination for the best tech deals of the year. We bring you unbeatable prices on the products you love.
          </p>
        </div>

        <div className="bg-cyber-main rounded-2xl p-10 text-white text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            To make cutting-edge technology accessible to everyone by curating the best deals, 
            building trust through transparency, and delivering an exceptional shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Zap, title: "Speed", desc: "Flash deals updated in real-time so you never miss an offer." },
            { icon: Target, title: "Precision", desc: "Every product is hand-selected for value, quality and relevance." },
            { icon: Users, title: "Community", desc: "Thousands of happy shoppers trust us for their biggest purchases." },
            { icon: Award, title: "Quality", desc: "We only feature products from reputable, verified brands." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 flex gap-4">
              <div className="bg-cyber-promo/10 p-3 rounded-full h-fit">
                <Icon className="w-6 h-6 text-cyber-promo" />
              </div>
              <div>
                <h3 className="font-bold text-cyber-main mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
          <p className="text-gray-500 mb-2 text-sm font-semibold uppercase tracking-wider">Trusted by</p>
          <p className="text-5xl font-extrabold text-cyber-main mb-2">50,000+</p>
          <p className="text-gray-500">Happy shoppers across Europe</p>
        </div>
      </div>
    </div>
  );
}
