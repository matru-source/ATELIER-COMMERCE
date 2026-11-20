import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Check, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Product & Custom Sizing Consultation',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSent(true);
  };

  return (
    <div className="pt-28 pb-28 bg-atelier-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-2">
            Client Relations
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-atelier-text font-normal tracking-wide mb-4">
            CLIENT CONCIERGE
          </h1>
          <p className="text-xs sm:text-sm text-atelier-text-secondary leading-relaxed font-light">
            Whether inquiring about bespoke sizing, scheduling a private showroom viewing, or requesting styling counsel, our concierge team is at your dedicated service.
          </p>
          <div className="w-12 h-[1px] bg-atelier-accent/50 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-atelier-border p-8 sm:p-10 shadow-sm">
            <h3 className="font-serif text-2xl text-atelier-text font-normal mb-6">
              Inquire with Concierge
            </h3>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-atelier-accent/20 text-atelier-accent mx-auto flex items-center justify-center mb-2">
                  <Check className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="font-serif text-2xl text-atelier-text">Message Received</h4>
                <p className="text-xs text-atelier-text-secondary max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. A senior client concierge advisor will respond to your correspondence within 4 business hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 border border-atelier-border focus:outline-none focus:border-atelier-text bg-atelier-bg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@atelier.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border border-atelier-border focus:outline-none focus:border-atelier-text bg-atelier-bg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border border-atelier-border focus:outline-none focus:border-atelier-text bg-atelier-bg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                      Nature of Inquiry
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full p-3 border border-atelier-border focus:outline-none focus:border-atelier-text bg-atelier-bg text-xs"
                    >
                      <option>Product & Custom Sizing Consultation</option>
                      <option>Private Showroom Appointment</option>
                      <option>Order Status & White-Glove Transit</option>
                      <option>Bespoke / Press Collaboration</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-luxury uppercase text-atelier-text-secondary font-medium">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Please specify your request or scheduling preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-atelier-border focus:outline-none focus:border-atelier-text bg-atelier-bg leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-atelier-dark text-atelier-bg text-xs tracking-luxury uppercase font-semibold hover:bg-atelier-accent transition-colors shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Transmit Correspondence</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Contacts & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-atelier-border p-6 sm:p-8 space-y-6">
              <h4 className="font-serif text-xl text-atelier-text font-normal border-b border-atelier-border pb-3">
                Concierge Contact
              </h4>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-atelier-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-atelier-text block">Client Correspondence</span>
                    <a href="mailto:clientcare@ateliercommerce.com" className="text-atelier-text-secondary hover:text-atelier-accent transition-colors">
                      clientcare@ateliercommerce.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-atelier-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-atelier-text block">Dedicated Concierge Line</span>
                    <a href="tel:+912284920100" className="text-atelier-text-secondary hover:text-atelier-accent transition-colors">
                      +91 (022) 8492 0100 (Mon – Sat 10am – 8pm IST)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-atelier-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-atelier-text block">Private Salon Hours</span>
                    <span className="text-atelier-text-secondary">
                      Monday through Sunday · By Appointment Only
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flagship Address Card */}
            <div className="bg-atelier-bg-secondary border border-atelier-border p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-atelier-accent">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] tracking-widest-luxury uppercase font-semibold">Flagship Salon</span>
              </div>
              <h5 className="font-serif text-lg text-atelier-text">Maison Atelier Mumbai</h5>
              <p className="text-xs text-atelier-text-secondary leading-relaxed">
                42 Altamount Road, Cumballa Hill<br />
                Mumbai, Maharashtra 400026<br />
                Valet parking and private salon viewings available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
