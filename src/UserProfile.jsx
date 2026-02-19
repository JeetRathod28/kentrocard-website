
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Phone, Mail, Globe, MapPin, User, Briefcase, Share2, Download, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
    const [leadSubmitted, setLeadSubmitted] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*, companies(name)')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setUser(data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("User not found");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);



    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        // Hypothetical lead submission logic
        try {
            const { error } = await supabase
                .from('leads')
                .insert([{ user_id: id, ...leadForm }]);

            if (error) throw error;

            console.log("Lead Submitted:", { userId: id, ...leadForm });
            setLeadSubmitted(true);
            setTimeout(() => setLeadSubmitted(false), 3000);
            setLeadForm({ name: '', email: '', phone: '' });
        } catch (err) {
            console.error("Error submitting lead:", err);
            alert("Failed to submit lead. Please try again.");
        }
        setTimeout(() => setLeadSubmitted(false), 3000);
        setLeadForm({ name: '', email: '', phone: '' });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">{error}</div>;
    if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">User not found.</div>;

    return (
        <div className="min-h-screen bg-white flex justify-center">
            <div className="w-full max-w-md bg-white shadow-xl overflow-hidden relative">
                {/* Header / Cover Image */}
                <div className="h-48 bg-gray-100 relative">
                    {/* Placeholder for cover image if user has one, or just a solid color/gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-80"></div>
                </div>

                {/* Profile Picture */}
                <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                        {user.profile_image_url ? (
                            <img src={user.profile_image_url} alt={user.full_name} className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-full h-full text-gray-400 p-4" />
                        )}
                    </div>
                </div>

                {/* Profile Info */}
                <div className="mt-20 px-6 text-center">
                    <h1 className="text-2xl font-bold text-[#0F172A]">{user.full_name}</h1>
                    <p className="text-[#6B7280] mt-1">
                        {user.job_title}
                        {user.company_role ? <span className="block text-sm text-[#6B7280]">at {user.companies?.name}</span> : null}
                    </p>
                </div>

                {/* Social Grid */}
                <div className="flex justify-center gap-6 mt-6 px-6 flex-wrap">
                    {user.phone && (
                        <a href={`tel:${user.phone}`} className="text-[#0F172A] hover:text-gray-700 transition-colors">
                            <Phone size={32} />
                        </a>
                    )}
                    {user.email && (
                        <a href={`mailto:${user.email}`} className="text-[#0F172A] hover:text-gray-700 transition-colors">
                            <Mail size={32} />
                        </a>
                    )}
                    {user.vcard_url && (
                        <a href={user.vcard_url} target="_blank" rel="noopener noreferrer" className="text-[#0F172A] hover:text-gray-700 transition-colors">
                            <Globe size={32} />
                        </a>
                    )}
                    {user.Instagram && (
                        <a href={user.Instagram} target="_blank" rel="noopener noreferrer" className="text-[#0F172A] hover:text-gray-700 transition-colors">
                            <Instagram size={32} />
                        </a>
                    )}
                    {user.facebook && (
                        <a href={user.facebook} target="_blank" rel="noopener noreferrer" className="text-[#0F172A] hover:text-gray-700 transition-colors">
                            <Facebook size={32} />
                        </a>
                    )}
                    {user['LinkedIn'] && (
                        <a href={user['LinkedIn']} target="_blank" rel="noopener noreferrer" className="text-[#0F172A] hover:text-gray-700 transition-colors">
                            <Linkedin size={32} />
                        </a>
                    )}
                </div>

                {/* Primary Actions */}
                <div className="px-6 mt-8 space-y-3">

                    <a
                        href={user.vcard_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3.5 px-4 bg-[#734BFF] text-white font-semibold rounded-xl text-center shadow-sm hover:bg-[#6441dd] transition-colors"
                    >
                        Visit Website
                    </a>
                </div>

                {/* Lead Capture Form */}
                <div className="mt-10 px-6 py-8 bg-gray-50 text-[#0F172A] border-t border-gray-100">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold">Leave your contact details</h3>
                        <p className="text-[#6B7280] text-sm mt-1">I'll get back to you as soon as possible</p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={leadForm.name}
                                onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#734BFF] text-[#0F172A] placeholder-[#9CA3AF]"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={leadForm.email}
                                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#734BFF] text-[#0F172A] placeholder-[#9CA3AF]"
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone"
                                required
                                value={leadForm.phone}
                                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#734BFF] text-[#0F172A] placeholder-[#9CA3AF]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            {leadSubmitted ? 'Sent!' : 'Submit'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="py-6 text-center bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-[#6B7280] flex items-center justify-center gap-2">
                        <span>Powered by</span>
                        <img src="/src/assets/KentroCard Logo.svg" alt="KentroCard" className="h-5" />
                        {/* Fallback text if logo missing */}
                        <span className="sr-only">KentroCard</span>
                    </p>
                    <a href="#" className="text-xs text-[#FFC107] font-medium mt-1 block">Create your own Link in Bio</a>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
