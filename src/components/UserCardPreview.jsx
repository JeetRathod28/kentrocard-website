
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, Linkedin } from 'lucide-react';

const UserCardPreview = ({ user }) => {
    return (
        <motion.div
            className="w-80 h-[450px] bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-6 relative flex flex-col items-center justify-between shadow-2xl"
            whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ perspective: 1000 }}
        >
            {/* Glass Highlight */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-50 to-transparent rounded-t-3xl pointer-events-none"></div>

            <div className="flex flex-col items-center w-full z-10">
                <div className="w-24 h-24 rounded-full border-2 border-[#FFC107] overflow-hidden mb-4 shadow-lg">
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">{user.name}</h3>
                <p className="text-[#FFC107] text-sm font-medium">{user.role}</p>
                <p className="text-[#6B7280] text-xs mt-1">{user.company}</p>
            </div>

            <div className="flex gap-3 mt-4">
                {[Phone, Mail, Globe, Linkedin].map((Icon, idx) => (
                    <motion.div
                        key={idx}
                        className="p-2 bg-gray-50 rounded-full border border-gray-200 text-[#0F172A] hover:bg-[#FFC107] hover:text-black transition-colors cursor-pointer shadow-sm"
                        custom={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Icon size={18} />
                    </motion.div>
                ))}
            </div>

            <div className="w-full mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100 text-[#0F172A]">
                <p className="text-xs text-[#9CA3AF] mb-3 text-center">Leave your contact details</p>
                <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded-md w-full animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded-md w-full animate-pulse delay-75"></div>
                </div>
            </div>
        </motion.div>
    );
};

export default UserCardPreview;
