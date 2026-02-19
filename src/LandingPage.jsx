
import React from 'react';
import HeroSection from './components/HeroSection';
import UserCardPreview from './components/UserCardPreview';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const LandingPage = () => {
    // Mock data for user card carousel
    const mockUsers = [
        { name: "Aniruddh Patel", role: "Co-Founder", company: "Live D365", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
        { name: "Sarah Chen", role: "Product Lead", company: "TechFlow", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
        { name: "Michael Ross", role: "Senior Dev", company: "CodeCraft", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
    ];

    const features = [
        "Unique URL for every user",
        "Instant VCard Download",
        "Integrated Lead Capture Form",
        "Custom Branding & Themes",
        "Mobile-First Design",
        "Analytics Dashboard (Coming Soon)"
    ];

    return (
        <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden font-sans">
            {/* Hero Section */}
            <HeroSection />

            {/* Service Showcase */}
            <section className="py-24 px-6 relative bg-gray-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Professional Landing Page Services</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We don't just provide links. We build full-featured, mobile-optimized business pages that convert visitors into leads.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Features List */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="p-2 bg-[#FFC107]/20 rounded-full text-[#FFC107]">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span className="text-lg font-medium text-gray-800">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive User Cards Carousel */}
                        <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-full"></div>

                            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar px-4 w-full">
                                {mockUsers.map((user, index) => (
                                    <div key={index} className="snap-center shrink-0 first:pl-4 last:pr-4">
                                        <UserCardPreview user={user} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-200 text-center text-gray-500 bg-white">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <img src="/src/assets/KentroCard Logo.svg" alt="Logo" className="h-8 hover:opacity-80 transition-all" />
                </div>
                <p>&copy; {new Date().getFullYear()} KentroCard. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
