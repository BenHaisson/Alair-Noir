'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { luxuryEase } from '@/lib/motion';

const vehicleOptions = ['Mercedes S-Class', 'BMW 7 Series', 'Mercedes V-Class', 'Rolls-Royce Ghost'];
const serviceOptions = ['Airport Transfer', 'Corporate Travel', 'Wedding', 'Event / Occasion', 'Documents', 'Diplomatic'];

export function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    pickup: '',
    dropoff: '',
    date: '',
    vehicle: '',
    service: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="booking-section" id="book">
      <div className="booking-intro">
        <Reveal>
          <p className="eyebrow">Book Your Journey</p>
        </Reveal>
        <SplitText
          text="Reserve Your Chauffeur"
          as="h2"
          delay={0.1}
          staggerDelay={0.045}
        />
        <Reveal delay={0.3}>
          <p>
            Complete the form and we will confirm your booking within 15 minutes.
            All requests handled with full discretion.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="contact-mini" style={{ marginTop: 32 }}>
            <a href="tel:+41441234567">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M2 2h3l1.5 3.5-1.5 1c.5 1 2 2.5 3 3l1-1.5L12.5 9V12c-5.5 1-11-4.5-10.5-10z" />
              </svg>
              +41 44 123 45 67
            </a>
            <a href="mailto:info@alairnoir.ch">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="3" width="12" height="8" rx="1" />
                <path d="M1 4l6 4 6-4" />
              </svg>
              info@alairnoir.ch
            </a>
          </div>
        </Reveal>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="booking-success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="16" cy="16" r="15" />
              <path d="M9 16l5 5 9-9" />
            </svg>
            <h3>Request Received</h3>
            <p>
              Thank you. We will confirm your booking within 15 minutes. A member of our
              team will contact you at the details provided.
            </p>
            <p>For immediate assistance, call +41 44 123 45 67.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="booking-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: luxuryEase }}
          >
            <div className="booking-panel">
              <h3>Journey Details</h3>

              <div className="field-grid">
                <label className="field">
                  Full Name
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                </label>
                <label className="field">
                  Email
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </label>
                <label className="field">
                  Phone
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+41 ..." />
                </label>
                <label className="field">
                  Date & Time
                  <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
                </label>
                <label className="field">
                  Pick-up Location
                  <input name="pickup" value={form.pickup} onChange={handleChange} placeholder="Address or airport" required />
                </label>
                <label className="field">
                  Drop-off Location
                  <input name="dropoff" value={form.dropoff} onChange={handleChange} placeholder="Destination" required />
                </label>
                <label className="field">
                  Vehicle Preference
                  <select name="vehicle" value={form.vehicle} onChange={handleChange} style={{ width: '100%', border: '1px solid rgba(102,255,209,.22)', background: 'rgba(0,0,0,.2)', color: 'var(--text)', padding: '12px', outline: 'none', borderRadius: 0, appearance: 'none' }}>
                    <option value="">Any available</option>
                    {vehicleOptions.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </label>
                <label className="field">
                  Service Type
                  <select name="service" value={form.service} onChange={handleChange} style={{ width: '100%', border: '1px solid rgba(102,255,209,.22)', background: 'rgba(0,0,0,.2)', color: 'var(--text)', padding: '12px', outline: 'none', borderRadius: 0, appearance: 'none' }}>
                    <option value="">Select a service</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
              </div>

              <label className="field" style={{ marginTop: 8 }}>
                Additional Notes
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Flight number, special requirements, passenger notes..."
                  rows={3}
                  style={{ resize: 'vertical' }}
                />
              </label>

              <p className="form-note">
                All bookings are confirmed within 15 minutes. Payment arrangements are made directly with your dedicated concierge.
              </p>
            </div>

            <div className="booking-actions">
              <span />
              <button type="submit" className="button button--gold">
                Submit Request
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
