"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mblaaeqj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white/80 backdrop-blur-sm border border-pastel/40 p-12"
          >
            <div className="w-16 h-16 bg-strawberry rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-bordeaux mb-3">
              Thank you for reaching out!
            </h3>
            <p className="text-bordeaux/60 mb-8">
              I&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold bg-strawberry text-white hover:bg-ember transition-colors duration-200"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 bg-pastel/15">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl font-bold text-bordeaux mb-4 text-center"
        >
          Let&apos;s Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-bordeaux/60 text-center mb-12 max-w-lg mx-auto"
        >
          I&apos;m always interested in new opportunities and exciting projects.
          Feel free to reach out!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl bg-white/80 backdrop-blur-sm border border-pastel/40 p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-3.5 bg-cream border rounded-xl text-bordeaux placeholder-bordeaux/35 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name
                      ? "border-ember/50 focus:ring-ember/20"
                      : "border-pastel/50 focus:ring-strawberry/20 focus:border-strawberry/40"
                  }`}
                />
                {errors.name && (
                  <p className="text-ember text-xs mt-1.5 ml-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-3.5 bg-cream border rounded-xl text-bordeaux placeholder-bordeaux/35 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email
                      ? "border-ember/50 focus:ring-ember/20"
                      : "border-pastel/50 focus:ring-strawberry/20 focus:border-strawberry/40"
                  }`}
                />
                {errors.email && (
                  <p className="text-ember text-xs mt-1.5 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-5 py-3.5 bg-cream border rounded-xl text-bordeaux placeholder-bordeaux/35 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                  errors.message
                    ? "border-ember/50 focus:ring-ember/20"
                    : "border-pastel/50 focus:ring-strawberry/20 focus:border-strawberry/40"
                }`}
              />
              {errors.message && (
                <p className="text-ember text-xs mt-1.5 ml-1">
                  {errors.message}
                </p>
              )}
            </div>

            {errors.submit && (
              <div className="text-ember text-sm text-center bg-ember/5 border border-ember/20 rounded-xl py-3">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                isSubmitting
                  ? "bg-bordeaux/30 text-bordeaux/50 cursor-not-allowed"
                  : "bg-strawberry text-white hover:bg-ember hover:shadow-lg hover:shadow-strawberry/15"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
