"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  description: z.string().min(10, "Please provide more details about your project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit form");
      setSuccess(true);
      reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "block w-full rounded-xl border-0 px-4 py-3 text-foreground bg-secondary/30 shadow-sm ring-1 ring-inset ring-border/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm transition-all placeholder:text-muted-foreground/50";
  const selectClass = "block w-full rounded-xl border-0 px-4 py-3.5 text-foreground bg-secondary/30 shadow-sm ring-1 ring-inset ring-border/50 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm transition-all";

  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-32 px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[40%] h-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]"></div>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <Send className="mr-2 h-4 w-4" /> Get in Touch
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">
                Let&apos;s Build Something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">Amazing</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Fill out the form and we&apos;ll get back to you within 24 hours with a custom proposal tailored to your needs.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "hello@logicintel.com", href: "mailto:hello@logicintel.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
                  { icon: MapPin, label: "Location", value: "San Francisco, CA", href: undefined },
                  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: undefined }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="rounded-xl p-3 bg-primary/10 text-primary shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-foreground hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="font-semibold text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 sm:p-10 shadow-xl">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">We&apos;ll be in touch within 24 hours.</p>
                    <Button onClick={() => setSuccess(false)} variant="outline" className="rounded-full">Send Another Message</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                        <input type="text" {...register("fullName")} placeholder="John Doe" className={inputClass} />
                        {errors.fullName && <p className="mt-1.5 text-sm text-destructive">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                        <input type="email" {...register("email")} placeholder="john@company.com" className={inputClass} />
                        {errors.email && <p className="mt-1.5 text-sm text-destructive">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                        <input type="tel" {...register("phone")} placeholder="+1 (555) 000-0000" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Company</label>
                        <input type="text" {...register("companyName")} placeholder="Acme Inc." className={inputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Project Type *</label>
                        <select {...register("projectType")} className={selectClass}>
                          <option value="">Select type</option>
                          <option value="website">Business Website</option>
                          <option value="ecommerce">E-Commerce</option>
                          <option value="webapp">Web App (SaaS)</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.projectType && <p className="mt-1.5 text-sm text-destructive">{errors.projectType.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Budget *</label>
                        <select {...register("budgetRange")} className={selectClass}>
                          <option value="">Select budget</option>
                          <option value="<500">Under $500</option>
                          <option value="500-2000">$500 - $2,000</option>
                          <option value="2000-5000">$2,000 - $5,000</option>
                          <option value="5000+">$5,000+</option>
                        </select>
                        {errors.budgetRange && <p className="mt-1.5 text-sm text-destructive">{errors.budgetRange.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Timeline *</label>
                        <select {...register("timeline")} className={selectClass}>
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1month">1 Month</option>
                          <option value="2-3months">2-3 Months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                        {errors.timeline && <p className="mt-1.5 text-sm text-destructive">{errors.timeline.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Project Details *</label>
                      <textarea {...register("description")} rows={4} placeholder="Tell us about your project, goals, and any specific requirements..." className={inputClass} />
                      {errors.description && <p className="mt-1.5 text-sm text-destructive">{errors.description.message}</p>}
                    </div>

                    {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}

                    <Button type="submit" disabled={isSubmitting} className="w-full rounded-full h-12 text-base shadow-[0_0_30px_-8px_rgba(46,134,171,0.4)]">
                      {isSubmitting ? "Sending..." : "Send Message"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
