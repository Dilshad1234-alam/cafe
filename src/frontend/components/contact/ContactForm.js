"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    toast.success("Thank you! We have received your message.");
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Send Us a Message</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-brand-yellow/5 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-brand-red font-medium">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number <span className="text-brand-red">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
                  placeholder="e.g., 9876543210"
                />
                {errors.phone && <p className="mt-1 text-sm text-brand-red font-medium">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="e.g., Party Order"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                Your Message <span className="text-brand-red">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none`}
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-brand-red font-medium">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
