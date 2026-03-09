import {
    Phone, PhoneCall, Smartphone,
    Mail, MailOpen,
    Globe, Globe2, Link,
    Linkedin,
    Instagram,
    Facebook,
    MessageCircle, MessageSquare,
} from 'lucide-react';

// Map of platform -> ordered array of icon components matching Flutter app's socialIconStyles index
export const ICON_STYLES = {
    phone: [Phone, PhoneCall, Smartphone, Phone],   // index 3 falls back to Phone (no PhoneHandset in lucide)
    email: [Mail, Mail, MailOpen, Mail],             // index 3 falls back to Mail (no MailBox in lucide)
    website: [Globe, Globe, Globe2, Link],
    linkedin: [Linkedin, Linkedin],
    instagram: [Instagram, Instagram],
    facebook: [Facebook, Facebook, Facebook],
    whatsapp: [MessageCircle, MessageSquare],
};

/**
 * Returns the correct lucide-react icon component for a given platform and style index.
 * @param {string} platform - e.g. 'phone', 'email', 'linkedin'
 * @param {number} styleIndex - index from design.socialIconStyles[platform]
 * @returns React component
 */
export function getIconComponent(platform, styleIndex = 0) {
    const icons = ICON_STYLES[platform] || [];
    if (icons.length === 0) return null;
    const clampedIndex = Math.min(styleIndex, icons.length - 1);
    return icons[clampedIndex];
}
