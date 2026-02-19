
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className, onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            className={className}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-gray-900">
            {/* Abstract Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-gray-50 to-white z-0"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFC107]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                {/* Abstract Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex justify-center mb-6">
                        <img src="/src/assets/KentroCard Logo.svg" alt="KentroCard Logo" className="h-16 object-contain" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        Your Link-in-Bio, <br /> Reimagined.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-light">
                        Create a stunning, branded digital hub that connects your content, products, and business tools in one place.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <MagneticButton className="px-8 py-4 bg-[#FFC107] text-black font-bold rounded-full text-lg shadow-lg hover:shadow-[#FFC107]/50 transition-shadow">
                            Get Started Free
                        </MagneticButton>
                        <MagneticButton className="px-8 py-4 bg-white border border-gray-200 text-gray-900 font-medium rounded-full text-lg hover:bg-gray-50 transition-colors shadow-sm">
                            View Samples
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
