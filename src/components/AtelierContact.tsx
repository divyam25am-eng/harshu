import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Check, Calendar, Users, Send } from 'lucide-react';

export const AtelierContact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('50');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <section id="atelier" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3E2F]">
            San Francisco Atelier &amp; Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1C]">
            Visit Us or Inquire for Bespoke Events
          </h2>
          <p className="text-xs sm:text-sm text-[#6B615A]">
            Whether picking up a celebration cake or planning wedding tiers for 200 guests, our pastry chefs are delighted to welcome you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Atelier Hours & Location */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3D6] space-y-6">
            <h3 className="text-xl font-serif text-[#241E1C]">Atelier Details</h3>

            <div className="space-y-4 text-xs text-[#5C524B]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9E3E2F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#241E1C]">Location &amp; Collection Window</div>
                  <div className="text-[#6B615A] mt-0.5">
                    428 Artisan Way, Suite 100<br />
                    San Francisco, CA 94107
                  </div>
                  <div className="text-[11px] text-[#8C827A] mt-1">
                    Dedicated 15-minute bakery pickup parking stalls in front.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F0EBE1]">
                <Clock className="w-4 h-4 text-[#9E3E2F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#241E1C]">Atelier Hours</div>
                  <div className="mt-0.5 space-y-0.5 text-[#6B615A]">
                    <div>Tuesday – Friday: 8:00 AM – 6:00 PM</div>
                    <div>Saturday: 8:30 AM – 6:00 PM</div>
                    <div>Sunday: 9:00 AM – 3:00 PM</div>
                    <div className="text-[11px] text-[#8C827A]">Monday: Closed for recipe R&amp;D</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F0EBE1]">
                <Phone className="w-4 h-4 text-[#9E3E2F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#241E1C]">Direct Atelier Phone</div>
                  <div className="text-[#6B615A] mt-0.5">(415) 890-2453</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F0EBE1]">
                <Mail className="w-4 h-4 text-[#9E3E2F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#241E1C]">Concierge &amp; Events</div>
                  <div className="text-[#6B615A] mt-0.5">atelier@velvetandcrumb.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Wedding / Gala Consultation Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3D6]">
            <h3 className="text-xl font-serif text-[#241E1C]">
              Reserve a Wedding or Gala Cake Consultation
            </h3>
            <p className="text-xs text-[#6B615A] mt-1 mb-6">
              Share details about your gathering. Our head pastry chef will connect with you within 24 hours with design moodboards and tasting options.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-[#FAF7F2] rounded-xl border border-[#D9CEBF] space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EBF4EC] text-[#2E6F40] mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif text-[#241E1C]">
                  Consultation Request Received
                </h4>
                <p className="text-xs text-[#6B615A] max-w-sm mx-auto">
                  Thank you, {name}! Chef Margot and our wedding atelier team will review your date ({eventDate || 'Upcoming'}) and respond shortly to confirm your tasting consultation.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-3 px-4 py-2 text-xs text-[#9E3E2F] hover:underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Eleanor Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C] mb-1">
                      Celebration Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C] mb-1">
                      Estimated Guests
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F] bg-white"
                    >
                      <option value="20-40">20–40 Guests</option>
                      <option value="50">50–80 Guests</option>
                      <option value="100">100–150 Guests</option>
                      <option value="200+">200+ Guests (Multi-tier grand)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#241E1C] mb-1">
                    Event Vision &amp; Flavor Inquiries
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your celebration theme, preferred botanical flavors, venue location, or floral accents..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D9CEBF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9E3E2F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#241E1C] hover:bg-[#3D3531] text-white text-xs font-medium tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Consultation Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
