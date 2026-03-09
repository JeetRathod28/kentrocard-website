import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import QRCode from 'react-qr-code';
import { toast, Toaster } from 'react-hot-toast';
import { Phone, Mail } from 'lucide-react';
import { getIconComponent } from './iconMapping';

// Design Constants
const GRADIENTS = {
    0: 'linear-gradient(135deg, #FFB6C1, #E6E6FA, #DDA0DD)', // Rose Lavender
    1: 'linear-gradient(135deg, #667eea, #764ba2)', // Ocean Dusk
    2: 'linear-gradient(135deg, #f7971e, #ffd200)', // Midnight Gold
    3: 'linear-gradient(135deg, #e0eafc, #cfdef3)', // Arctic Slate
};

const TEXT_COLORS = {
    0: '#FFFFFF', // White
    1: '#0F172A', // Black
    2: '#FFD700'  // Golden
};

const getGradient = (index, customColors) => {
    if (customColors && customColors.length > 0) {
        if (customColors.length === 1) return customColors[0];
        return `linear-gradient(135deg, ${customColors.join(', ')})`;
    }
    return GRADIENTS[index] || GRADIENTS[0];
};

const getTextColor = (index) => TEXT_COLORS[index] || TEXT_COLORS[1];

const adjustOpacity = (hexColor, opacity) => {
    // Basic hex to rgba converter for simple hex codes
    if (!hexColor) return `rgba(0,0,0,${opacity})`;
    let hex = hexColor.replace('#', '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
};

const launchUrl = (url) => {
    if (!url) return;
    let formattedUrl = url;
    if (!url.startsWith('http://') &&
        !url.startsWith('https://') &&
        !url.startsWith('tel:') &&
        !url.startsWith('mailto:')) {
        formattedUrl = 'https://' + url;
    }
    window.open(formattedUrl, '_blank');
};


// Components
const IconButton = ({ icon: Icon, onClick, size, color }) => (
    <button
        onClick={onClick}
        style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: '0 2px 8px rgba(123, 75, 255, 0.15)', // Soft purple shadow
            transition: 'box-shadow 0.3s, transform 0.2s',
            color: color || '#1F2937',
            cursor: 'pointer',
            padding: 0 // Remove default padding since we have fixed width/height
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(123, 75, 255, 0.25)';
            e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(123, 75, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1)';
        }}
    >
        <Icon size={size || 22} />
    </button>
);


const inputStyle = {
    width: '100%',
    padding: '10px 16px',
    marginBottom: '12px',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '15px',
    fontFamily: 'inherit',
    backgroundColor: 'white'
};


const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state corresponding to "ContactForm" from design
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        customFields: {} // key: field.id, value: user input
    });
    const [submitting, setSubmitting] = useState(false);

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Build custom_fields array from form input — only store label + value
            const customFieldsPayload = Object.entries(formData.customFields).map(([fieldId, value]) => {
                const fieldDef = (contactFormRef.current?.customFields || []).find(f => f.id === fieldId);
                return {
                    label: fieldDef?.label || fieldId,
                    value
                };
            });

            const { error } = await supabase
                .from('contact_form_submissions')
                .insert([{
                    owner_id: id,
                    name: formData.name,
                    email: formData.email || null,
                    phone: formData.phone || null,
                    custom_fields: customFieldsPayload.length > 0 ? customFieldsPayload : null,
                    source: 'vcard_view'
                }]);

            if (error) throw error;
            toast.success('Thanks! Your details were sent.');
            setFormData({ name: '', email: '', phone: '', customFields: {} });
        } catch (err) {
            console.error("Error submitting lead:", err);
            toast.error("Failed to submit. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Ref to pass contactForm into the submit handler closure
    const contactFormRef = React.useRef(null);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">{error}</div>;
    if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">User not found.</div>;

    // --- Data Extraction & Mocking (Since Backend might not have full `Design` JSON yet) ---
    // If user.Design exists, we'd use it directly. Otherwise, we mock it based on existing user data.
    const design = user.Design || {
        card: {
            gradientIndex: 0,
            textColorIndex: 2, // Golden
            customBackgroundColors: ['#6D59F0']
        },
        socialLinks: {
            phone: user.phone || '',
            email: user.email || '',
            website: user.website || user.vcard_url || '',
            instagram: user.Instagram || '',
            facebook: user.facebook || '',
            linkedin: user['LinkedIn'] || '',
            whatsapp: user.phone || ''
        },
        buttons: user.vcard_url ? [
            { label: 'Download vCard', url: user.vcard_url, isDefault: true }
        ] : [],
        contactForm: {
            enabled: true,
            mandatoryField: 'email',
            showPhone: true,
            showEmail: true,
            customFields: []
        }
    };

    const gradient = getGradient(design.card.gradientIndex, design.card.customBackgroundColors);
    const textColor = getTextColor(design.card.textColorIndex);
    const { socialLinks, socialIconStyles, buttons, contactForm } = design;

    // Build social icons list, using socialIconStyles index to pick the correct lucide icon per platform
    const URL_ACTIONS = {
        phone: (val) => launchUrl(`tel:${val}`),
        email: (val) => launchUrl(`mailto:${val}`),
        website: (val) => launchUrl(val),
        instagram: (val) => launchUrl(val),
        facebook: (val) => launchUrl(val),
        linkedin: (val) => launchUrl(val),
        whatsapp: (val) => launchUrl(`https://wa.me/${val}`),
    };
    const PLATFORM_ORDER = ['phone', 'email', 'website', 'instagram', 'facebook', 'linkedin', 'whatsapp'];
    const displayIcons = PLATFORM_ORDER
        .filter(key => socialLinks[key])
        .map(key => ({
            key,
            icon: getIconComponent(key, socialIconStyles?.[key] ?? 0),
            action: URL_ACTIONS[key],
        }))
        .filter(item => item.icon !== null);


    return (
        <div className="min-h-screen bg-gray-50 flex justify-center w-full" style={{ fontFamily: 'sans-serif' }}>
            <Toaster position="bottom-center" />
            {/* Scrollable Container mapping standard view specs */}
            <div className="w-full max-w-md bg-white shadow-xl relative" style={{ padding: '24px 24px 16px 24px', overflowY: 'auto', minHeight: '100vh' }}>

                {/* 1. BUSINESS CARD SECTION */}
                <div
                    style={{
                        background: gradient,
                        borderRadius: '24px',
                        padding: '24px',
                        boxShadow: '0 8px 15px rgba(0,0,0,0.08)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Top Row: Avatar + Name/Title */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 10 }}>
                        {/* Avatar */}
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            overflow: 'hidden',
                            backgroundColor: '#FFED4B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {user.profile_image_url ? (
                                <img src={user.profile_image_url} alt={user.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '24px', fontWeight: 600, color: '#fff' }}>
                                    {(user.full_name || 'U').substring(0, 2).toUpperCase()}
                                </span>
                            )}
                        </div>

                        {/* Name & Title */}
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 700, color: textColor, margin: '0 0 4px 0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                {user.full_name || 'No Name'}
                            </h2>
                            <p style={{ fontSize: '13px', fontWeight: 500, color: adjustOpacity(textColor, 0.9), margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                {user.job_title} {user.companies?.name ? `at ${user.companies.name}` : ''}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row: Contact Info + QR */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10, marginTop: '18px' }}>

                        {/* Contact Snippets */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingBottom: '8px' }}>
                            {socialLinks.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Phone size={15} color={textColor} fill={textColor} strokeWidth={1} />
                                    <span style={{ fontSize: '13px', fontWeight: 500, color: textColor }}>
                                        {socialLinks.phone}
                                    </span>
                                </div>
                            )}
                            {socialLinks.email && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Mail size={15} color={textColor} fill={textColor} strokeWidth={1} />
                                    <span style={{ fontSize: '13px', fontWeight: 500, color: textColor, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '160px' }}>
                                        {socialLinks.email}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* QR Code */}
                        <div style={{
                            width: '90px',
                            height: '90px',
                            background: 'white',
                            borderRadius: '12px',
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                            flexShrink: 0
                        }}>
                            {/* If Vcard URL not ready, fallback to window.location.href or website */}
                            <QRCode value={user.vcard_url || window.location.href} size={78} style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                </div>

                <div style={{ height: '24px' }}></div> {/* Vertical Space */}

                {/* 2. SOCIAL MEDIA ICONS ROW */}
                {displayIcons.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {displayIcons.map((item) => (
                            <IconButton
                                key={item.key}
                                icon={item.icon}
                                onClick={() => item.action(socialLinks[item.key])}
                                color="#1F2937"
                            />
                        ))}
                    </div>
                )}

                <div style={{ height: '32px' }}></div> {/* Vertical Space */}

                {/* 3. ACTION BUTTONS SECTION — only show non-default buttons */}
                {buttons && buttons.filter(b => !b.isDefault).length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {buttons.filter(b => !b.isDefault).map((button, idx) => (
                            <button
                                key={idx}
                                onClick={() => launchUrl(button.url)}
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    background: '#232323',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '12px 24px',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#000'}
                                onMouseOut={(e) => e.currentTarget.style.background = '#232323'}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                )}

                <div style={{ height: '48px' }}></div> {/* Vertical Space */}

                {/* 4. CONTACT FORM SECTION */}
                {contactForm?.enabled && (() => {
                    // Keep ref in sync for use in submit handler
                    contactFormRef.current = contactForm;
                    return (
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>
                                Leave your contact details
                            </h3>
                            <p style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', margin: '0' }}>
                                I'll get back to you as soon as possible
                            </p>

                            <form onSubmit={handleFormSubmit} style={{ marginTop: '32px', textAlign: 'left' }}>
                                {/* Name */}
                                <input
                                    type="text"
                                    placeholder="Name *"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={inputStyle}
                                />

                                {/* Email */}
                                {contactForm.showEmail && (
                                    <input
                                        type="email"
                                        placeholder={contactForm.mandatoryField === 'email' ? 'Email *' : 'Email'}
                                        required={contactForm.mandatoryField === 'email'}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={inputStyle}
                                    />
                                )}

                                {/* Phone */}
                                {contactForm.showPhone && (
                                    <input
                                        type="tel"
                                        placeholder={contactForm.mandatoryField === 'phone' ? 'Phone *' : 'Phone'}
                                        required={contactForm.mandatoryField === 'phone'}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        style={inputStyle}
                                    />
                                )}

                                {/* Custom Fields */}
                                {(contactForm.customFields || []).map((field) => (
                                    <input
                                        key={field.id}
                                        type="text"
                                        placeholder={field.required ? `${field.label} *` : field.label}
                                        required={field.required}
                                        value={formData.customFields[field.id] || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            customFields: { ...formData.customFields, [field.id]: e.target.value }
                                        })}
                                        style={inputStyle}
                                    />
                                ))}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        ...inputStyle,
                                        marginBottom: 0,
                                        marginTop: '4px',
                                        background: '#232323',
                                        color: 'white',
                                        height: '52px',
                                        fontWeight: 600,
                                        cursor: submitting ? 'not-allowed' : 'pointer',
                                        opacity: submitting ? 0.6 : 1,
                                        transition: 'background 0.2s',
                                        textAlign: 'center',
                                        border: 'none'
                                    }}
                                >
                                    {submitting ? 'Sending...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    );
                })()}

                <div style={{ height: '24px' }}></div> {/* Vertical Space */}

                {/* 5. POWERED BY LOGO FOOTER */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: '#9CA3AF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Powered by
                        <img src="/src/assets/KentroCard Logo.svg" alt="KentroCard" style={{ height: '30px', objectFit: 'contain' }} />
                    </p>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;
