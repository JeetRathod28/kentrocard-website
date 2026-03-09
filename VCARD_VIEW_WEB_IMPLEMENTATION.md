# vCard View Screen - Web Implementation Guide

A complete guide to implementing the vCard View screen in React.js with all design specifications, data structure, and functionality.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Flow & JSON Structure](#data-flow--json-structure)
3. [View Screen Design Specs](#view-screen-design-specs)
4. [Components & Sections](#components--sections)
5. [Color & Design System](#color--design-system)
6. [Implementation Examples](#implementation-examples)
7. [Icon Mappings](#icon-mappings)
8. [URL Schemes](#url-schemes)

---

## Architecture Overview

### How It Works

```
┌─────────────────────────────────────────────┐
│       UserProfile (Backend HTTP)            │
│  - id, fullName, jobTitle, phone, email     │
│  - profileImageUrl, website                 │
│  - instagram, facebook, linkedIn            │
│  - Design (JSON)                            │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         CardDesign (JSON Object)            │
│  - gradientIndex, textColorIndex            │
│  - custom colors, buttons, socialLinks      │
│  - contactForm config                       │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│       RENDER VIEW SCREEN (React)            │
│  1. Business Card (with gradient/colors)    │
│  2. Social Media Icons (clickable)          │
│  3. Action Buttons (from config)            │
│  4. Contact Form (if enabled)               │
└─────────────────────────────────────────────┘
```

### State Management Flow

```
Edit Mode (in Flutter)
  ↓
User changes:
  - Gradient/Background Colors
  - Text Color
  - Social Links & Icon Styles
  - Action Buttons
  - Form Config
  ↓
Clicks "Save Changes"
  ↓
API: PATCH /users/{userId}
  - Send Design JSON
  - cardDesign.toJson()
  ↓
Backend stores in `design.Design` JSONB column
  ↓
Web fetches user data
  ↓
View Screen renders with new Design
```

---

## Data Flow & JSON Structure

### Complete User Profile JSON (from Backend)

```json
{
  "id": "user-123",
  "email": "user@example.com",
  "full_name": "John Doe",
  "job_title": "Product Manager",
  "phone": "+91 9999999999",
  "company_id": "company-123",
  "company_role": "owner",
  "profile_image_url": "https://storage.example.com/john.jpg",
  "website": "https://kentrocard.com/user-123",
  "vcard_url": "https://storage.example.com/john.vcf",
  "Instagram": "https://instagram.com/johndoe",
  "facebook": "https://facebook.com/johndoe",
  "LinkedIn": "https://linkedin.com/in/johndoe",
  "created_at": "2024-01-15T10:30:00Z",
  "Design": {
    "card": {
      "gradientIndex": 1,
      "textColorIndex": 0,
      "customBackgroundColors": null,
      "savedCustomBackgrounds": []
    },
    "socialLinks": {
      "phone": "+91 9999999999",
      "email": "user@example.com",
      "website": "https://kentrocard.com/user-123",
      "instagram": "https://instagram.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe",
      "facebook": "https://facebook.com/johndoe",
      "whatsapp": "+919999999999"
    },
    "socialIconStyles": {
      "phone": 0,
      "email": 0,
      "website": 0,
      "instagram": 0,
      "linkedin": 0,
      "facebook": 0,
      "whatsapp": 0
    },
    "socialIconColors": {
      "phone": 0,
      "email": 0,
      "website": 0,
      "instagram": 0,
      "linkedin": 0,
      "facebook": 0,
      "whatsapp": 0
    },
    "buttons": [
      {
        "label": "Download vCard",
        "url": "https://storage.example.com/john.vcf",
        "isDefault": true
      },
      {
        "label": "Visit Portfolio",
        "url": "https://portfolio.example.com",
        "isDefault": false
      }
    ],
    "contactForm": {
      "enabled": true,
      "mandatoryField": "email",
      "showPhone": true,
      "showEmail": true,
      "customFields": [
        {
          "id": "field-1",
          "label": "Company Name",
          "fieldType": "text",
          "required": false
        },
        {
          "id": "field-2",
          "label": "Message",
          "fieldType": "text",
          "required": true
        }
      ]
    }
  }
}
```

### CardDesign JSON Structure (Only Design Part)

```json
{
  "card": {
    "gradientIndex": 0,
    "textColorIndex": 0,
    "customBackgroundColors": ["#FFB6C1", "#E6E6FA"],
    "savedCustomBackgrounds": []
  },
  "socialLinks": {
    "phone": "+91 9999999999",
    "email": "user@example.com",
    "website": "https://example.com",
    "instagram": "https://instagram.com/user",
    "linkedin": "https://linkedin.com/in/user",
    "facebook": "https://facebook.com/user",
    "whatsapp": "+919999999999"
  },
  "socialIconStyles": {
    "phone": 0,
    "email": 0,
    "website": 0,
    "instagram": 0,
    "linkedin": 0,
    "facebook": 0,
    "whatsapp": 0
  },
  "socialIconColors": {
    "phone": 0,
    "email": 0,
    "website": 0,
    "instagram": 0,
    "linkedin": 0,
    "facebook": 0,
    "whatsapp": 0
  },
  "buttons": [
    {
      "label": "Download vCard",
      "url": "https://...",
      "isDefault": true
    }
  ],
  "contactForm": {
    "enabled": true,
    "mandatoryField": "email",
    "showPhone": true,
    "showEmail": true,
    "customFields": []
  }
}
```

---

## View Screen Design Specs

### Page Layout

```
┌─────────────────────────────────────────────┐
│                    VIEW                      │
├─────────────────────────────────────────────┤
│                                              │
│        [BUSINESS CARD SECTION]               │
│        ┌─────────────────────────┐          │
│        │ Avatar | Name            │          │
│        │        | Title           │  [QR]   │
│        │ Phone                    │          │
│        │ Email                    │          │
│        └─────────────────────────┘          │
│                                              │
│              [VERTICAL SPACE: 24px]          │
│                                              │
│      [SOCIAL MEDIA ICONS ROW]                │
│      📱  ✉️  🌐  📷  💼  👍  💬             │
│                                              │
│              [VERTICAL SPACE: 32px]          │
│                                              │
│      [ACTION BUTTONS SECTION]                │
│      ┌──────────────────────────┐           │
│      │  Download vCard    ➜      │           │
│      └──────────────────────────┘           │
│      ┌──────────────────────────┐           │
│      │  Visit Portfolio         │           │
│      └──────────────────────────┘           │
│                                              │
│              [VERTICAL SPACE: 48px]          │
│                                              │
│        [CONTACT FORM SECTION]                │
│        "Leave your contact details"          │
│        "I'll get back to you..."             │
│        ┌──────────────────────┐             │
│        │ Name                 │             │
│        ├──────────────────────┤             │
│        │ Email                │             │
│        ├──────────────────────┤             │
│        │ Phone                │             │
│        ├──────────────────────┤             │
│        │   [Submit Button]    │             │
│        └──────────────────────┘             │
│                                              │
│              [VERTICAL SPACE: 24px]          │
│                                              │
│         Powered by [KENTRO CARD LOGO]       │
│                                              │
└─────────────────────────────────────────────┘
```

### Container Sizes

| Element | Width | Height | Notes |
|---------|-------|--------|-------|
| Page/Content | 100% (responsive) | auto | Scrollable |
| Business Card | 100% - 48px margins | 25% of viewport | Max on desktop |
| Avatar | 60px | 60px | Circular with border |
| Card Padding | 20px all sides | - | Inside card |
| QR Code | 90px | 90px | Bottom-right corner |
| Social Icon | 22px | 22px | Circle icon |
| Action Button | 100% (stretch) | 52px | Height |
| Input Field | 100% (stretch) | auto | Min height 48px |
| Submit Button | 100% (stretch) | 52px | Height |

### Main Content Padding

- **Top**: 24px (after safe area)
- **Bottom**: 16px (before safe area)
- **Left & Right**: 24px on each side

---

## Components & Sections

### 1. Business Card Section

#### Structure

```
┌──────────────────────────────────────────┐
│ [Avatar]                          [QR]  │
│ 60x60    Name (18px, bold)             │
│          Title (13px, normal, 80% opacity)
│ Phone icon  +91 9999999999 (12px)      │
│ Email icon  user@example.com (12px)    │
└──────────────────────────────────────────┘
```

#### Design Details

**Card Container**
- Background: Gradient or Solid Color (from `design.card.gradientIndex` or `customBackgroundColors`)
- Border Radius: 24px
- Padding: 20px
- Shadows:
  - Main shadow: `color: rgba(0,0,0,0.08)`, blur: 15px, offset: (0, 8), spread: 0
  - Side shadow: `color: rgba(0,0,0,0.04)`, blur: 8px, offset: (4, 6), spread: 0
  - Highlight: `color: rgba(255,255,255,0.2)`, blur: 10px, offset: (-2, -4), spread: 0

**Avatar**
- Size: 60x60px
- Border: 3px white border
- Shape: Circle
- Background: Gradient (if no image) - `linear-gradient(135deg, #FFC169, #FFED4B)`
- Initials (if no image):
  - Font size: 28px
  - Font weight: 600
  - Color: white
  - Get from `fullName` first two letters

**Name Text**
- Font size: 18px
- Font weight: 700
- Color: From `textColorIndex` (0=white, 1=black, 2=golden)

**Title Text**
- Font size: 13px
- Font weight: 500
- Color: Same as name but with 80% opacity

**Phone/Email Info**
- Icon size: 18px
- Font size: 12px
- Font weight: 500
- Color: Text color with 90% opacity
- Icon color: Text color with 90% opacity
- Spacing: 8px between icon and text
- Bottom margin: 6px (for phone)

**QR Code Section**
- Position: Absolute, bottom-right corner (8px from edges)
- Size: 90x90px
- Background: White
- Border Radius: 12px
- Shadow: `color: rgba(0,0,0,0.15)`, blur: 6px, offset: (0, 2)

---

### 2. Social Media Icons Row

#### Structure

```
Icons displayed horizontally, centered:
 📱  ✉️  🌐  📷  💼  👍  💬

Only show if icon has a value in socialLinks
Spacing between icons: 16px
```

#### Icon Mapping

Each social link type has 2-4 icon options (selected via `socialIconStyles[linkType]`):

```
phone:      [phone, phone_in_talk, phone_iphone, phone_fa]
email:      [email, mail, mark_email_unread, envelope_fa]
website:    [globe_fa, language, public, link]
instagram:  [instagram_fa, square_instagram_fa]
linkedin:   [linkedin_fa, linkedin_in_fa]
facebook:   [facebook_fa, facebook_f_fa, square_facebook_fa]
whatsapp:   [whatsapp_fa, message]
```

#### Icon Container

- Size: 22px icon
- Clickable button, no background
- Hover effect: Scale up slightly or change opacity
- Color: `#1F2937` (dark gray) when active, `#D3D4D6` (light gray) when inactive
- Cursor: pointer

#### Click Behavior

```javascript
// Phone
onClick: () => launchUrl('tel:' + socialLinks['phone'])

// Email
onClick: () => launchUrl('mailto:' + socialLinks['email'])

// Website
onClick: () => launchUrl(socialLinks['website'])

// Instagram, LinkedIn, Facebook
onClick: () => launchUrl(socialLinks['instagram/linkedin/facebook'])

// WhatsApp
onClick: () => launchUrl('https://wa.me/' + socialLinks['whatsapp'])
```

---

### 3. Action Buttons Section

#### Structure

```
Multiple buttons stacked vertically:
┌────────────────────────────────┐
│  Download vCard        ➜        │  ← Default button (has arrow)
└────────────────────────────────┘
┌────────────────────────────────┐
│  Visit Portfolio               │
└────────────────────────────────┘
```

#### Button Specs

- Width: 100% (stretch)
- Height: 52px
- Background: `#232323` (dark gray/black)
- Border: None
- Border Radius: 12px
- Padding: 24px horizontal, 12px vertical
- Margin Bottom: 12px (between buttons)
- Elevation: 0 (no shadow)

**Text**
- Font size: 15px
- Font weight: 600
- Color: `#FFFFFF` (white)
- Alignment: Center

**Default Button (isDefault: true)**
- Has arrow icon at the end:
  - Icon: `→` (arrow_forward)
  - Size: 18px
  - Color: white
  - Margin left: 8px

#### Click Behavior

```javascript
// External URLs
onClick: () => window.open(button.url, '_blank')

// Internal URLs (starting with 'internal://')
// Shows profile summary / more info
onClick: () => showMoreInfo()

// Example URLs
- "https://example.com"  → Opens in new tab
- "https://wa.me/919999999999" → Opens WhatsApp
- "internal://profile" → Shows profile summary
```

---

### 4. Contact Form Section

#### Structure

```
Title: "Leave your contact details"
      (font-size: 20px, font-weight: 700, color: #0F172A)

Subtitle: "I'll get back to you as soon as possible"
         (font-size: 14px, font-weight: 500, color: #6B7280)

[12px spacing]
[32px spacing]

Form Fields:
┌──────────────────────────┐
│ Name *                   │ ← Always shown
├──────────────────────────┤
│ Email * (if showEmail)   │
├──────────────────────────┤
│ Phone (if showPhone)     │
├──────────────────────────┤
│ Custom Field 1           │
├──────────────────────────┤
│   Submit Button          │
└──────────────────────────┘
```

#### Form Field Specs

**Input Field**
- Width: 100%
- Min Height: Auto (text fits)
- Padding: 16px horizontal, 10px vertical
- Border: 1px solid `#E5E7EB` (light gray)
- Border Radius: 12px
- Background: white
- Font size: 15px
- Placeholder/Label color: `#D1D5DB`

**States**
- Normal: Border `#E5E7EB`, 1px
- Focused: Border `#E5E7EB`, 2px
- Spacing between fields: 12px

**Submit Button**
- Width: 100% (stretch)
- Height: 52px
- Background: `#232323`
- Border: None
- Border Radius: 12px
- Font size: 16px
- Font weight: 600
- Color: white
- Top margin: 4px (if custom fields exist)

**Loading State**
- Show circular progress indicator inside button
- Button disabled (no click)

#### Form Validation & Submission

```javascript
// Required Fields
name: always required
email: required if mandatoryField === 'email' && showEmail === true
phone: required if mandatoryField === 'phone' && showPhone === true
customFields: required if field.required === true

// Submission
POST /api/submissions
{
  "ownerId": userProfile.id,
  "name": "...",
  "email": "...",
  "phone": "...",
  "customFields": [
    {
      "id": "field-1",
      "label": "Company Name",
      "type": "text",
      "required": false,
      "value": "..."
    }
  ],
  "source": "vcard_view"
}

// On Success
- Show toast: "Thanks! Your details were sent."
- Clear all fields
- Scroll to top

// On Error
- Show error toast with message
- Keep form data
```

---

### 5. Powered By Section

```
Text: "Powered by"
      (font-size: 12px, font-weight: 500, color: #9CA3AF)

[8px horizontal spacing]

Image: KentroCard Logo
       (height: 30px, fit: contain)
```

---

## Color & Design System

### Gradient Options (4 Presets)

```javascript
const GRADIENTS = [
  {
    id: 0,
    name: 'Rose Lavender',
    colors: ['#FFB6C1', '#E6E6FA', '#DDA0DD'],
    angle: 135 // top-left to bottom-right
  },
  {
    id: 1,
    name: 'Ocean Dusk',
    colors: ['#667eea', '#764ba2'],
    angle: 135
  },
  {
    id: 2,
    name: 'Midnight Gold',
    colors: ['#f7971e', '#ffd200'],
    angle: 135
  },
  {
    id: 3,
    name: 'Arctic Slate',
    colors: ['#e0eafc', '#cfdef3'],
    angle: 135
  }
];
```

### Text Color Options (3 Presets)

```javascript
const TEXT_COLORS = {
  0: '#FFFFFF', // White
  1: '#0F172A', // Black
  2: '#FFD700'  // Golden
};

const TEXT_COLOR_NAMES = {
  0: 'White',
  1: 'Black',
  2: 'Golden'
};
```

### Icon Color Options (6 Presets)

```javascript
const ICON_COLORS = {
  0: '#E91E63', // Pink (default)
  1: '#2196F3', // Blue
  2: '#4CAF50', // Green
  3: '#FF9800', // Orange
  4: '#9C27B0', // Purple
  5: '#00BCD4'  // Cyan
};

const ICON_COLOR_NAMES = {
  0: 'Pink',
  1: 'Blue',
  2: 'Green',
  3: 'Orange',
  4: 'Purple',
  5: 'Cyan'
};
```

### Custom Colors

If `customBackgroundColors` is provided:
- 1 color = Solid background
- 2+ colors = Linear gradient (top-left to bottom-right)

---

## Implementation Examples

### 1. React Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const VCardViewScreen = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customFields: {}
  });

  useEffect(() => {
    // Fetch user profile with design
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="vcard-view-container">
      <BusinessCard user={user} design={user.Design} />
      <SocialIconsRow design={user.Design} />
      <ActionButtonsSection design={user.Design} />
      <ContactFormSection 
        design={user.Design}
        userId={user.id}
        onSubmit={handleFormSubmit}
      />
      <PoweredBySection />
    </div>
  );
};
```

### 2. Business Card Component

```javascript
const BusinessCard = ({ user, design }) => {
  const { card, socialLinks } = design || {};
  const gradientIndex = card?.gradientIndex || 0;
  const textColorIndex = card?.textColorIndex || 0;
  const customColors = card?.customBackgroundColors;

  // Get background
  const gradient = getGradient(gradientIndex, customColors);
  const textColor = getTextColor(textColorIndex);

  // Get form data from design
  const phone = socialLinks?.phone || '';
  const email = socialLinks?.email || '';

  return (
    <div
      className="business-card"
      style={{
        background: gradient,
        borderRadius: '24px',
        padding: '20px',
        boxShadow: getCardShadows(),
        height: 'auto',
        position: 'relative'
      }}
    >
      {/* Avatar + Name/Title */}
      <div className="card-content" style={{ display: 'flex', gap: '14px' }}>
        <Avatar 
          name={user.fullName} 
          imageUrl={user.profileImageUrl}
          size={60}
        />
        
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: textColor,
            margin: '0 0 4px 0'
          }}>
            {user.fullName || 'Contact'}
          </h2>
          
          <p style={{
            fontSize: '13px',
            fontWeight: 500,
            color: adjustOpacity(textColor, 0.8),
            margin: 0
          }}>
            {user.jobTitle || 'Professional'}
          </p>

          {/* Phone */}
          {phone && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <PhoneIcon color={adjustOpacity(textColor, 0.9)} />
              <span style={{ fontSize: '12px', color: adjustOpacity(textColor, 0.9) }}>
                {phone}
              </span>
            </div>
          )}

          {/* Email */}
          {email && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <EmailIcon color={adjustOpacity(textColor, 0.9)} />
              <span style={{ fontSize: '12px', color: adjustOpacity(textColor, 0.9) }}>
                {email}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* QR Code */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          width: '90px',
          height: '90px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {user.vcardUrl && <QRCode value={user.vcardUrl} size={80} />}
      </div>
    </div>
  );
};
```

### 3. Social Icons Component

```javascript
const SocialIconsRow = ({ design }) => {
  const { socialLinks, socialIconStyles } = design || {};
  
  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return null;
  }

  const icons = [
    { key: 'phone', url: (val) => `tel:${val}` },
    { key: 'email', url: (val) => `mailto:${val}` },
    { key: 'website', url: (val) => val },
    { key: 'instagram', url: (val) => val },
    { key: 'linkedin', url: (val) => val },
    { key: 'facebook', url: (val) => val },
    { key: 'whatsapp', url: (val) => `https://wa.me/${val}` }
  ];

  const displayIcons = icons.filter((item) => socialLinks[item.key]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      margin: '24px 0'
    }}>
      {displayIcons.map((item) => (
        <IconButton
          key={item.key}
          icon={getIconForField(item.key, socialIconStyles?.[item.key] || 0)}
          onClick={() => launchUrl(item.url(socialLinks[item.key]))}
          size={22}
        />
      ))}
    </div>
  );
};
```

### 4. Action Buttons Component

```javascript
const ActionButtonsSection = ({ design }) => {
  const { buttons } = design || {};

  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
      {buttons.map((button, idx) => (
        <button
          key={idx}
          onClick={() => {
            if (button.url.startsWith('internal://')) {
              // Handle internal navigation
              showProfileSummary();
            } else {
              window.open(button.url, '_blank');
            }
          }}
          style={{
            background: '#232323',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            height: '52px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {button.label}
          {button.isDefault && <span>→</span>}
        </button>
      ))}
    </div>
  );
};
```

### 5. Contact Form Component

```javascript
const ContactFormSection = ({ design, userId, onSubmit }) => {
  const { contactForm } = design || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customFields: {}
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ownerId: userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        customFields: Object.entries(formData.customFields).map(([id, value]) => {
          const field = contactForm.customFields.find(f => f.id === id);
          return {
            id,
            label: field.label,
            type: field.fieldType,
            required: field.required,
            value
          };
        }),
        source: 'vcard_view'
      };

      await axios.post('/api/submissions', payload);
      alert('Thanks! Your details were sent.');
      setFormData({ name: '', email: '', phone: '', customFields: {} });
    } catch (error) {
      alert('Submission failed: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!contactForm?.enabled) return null;

  return (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
        Leave your contact details
      </h3>
      <p style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280' }}>
        I'll get back to you as soon as possible
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={inputStyle}
        />

        {/* Email */}
        {contactForm.showEmail && (
          <input
            type="email"
            placeholder="Email"
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
            placeholder="Phone"
            required={contactForm.mandatoryField === 'phone'}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={inputStyle}
          />
        )}

        {/* Custom Fields */}
        {contactForm.customFields.map((field) => (
          <input
            key={field.id}
            type={field.fieldType === 'email' ? 'email' : field.fieldType === 'number' ? 'number' : 'text'}
            placeholder={field.label}
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
            background: '#232323',
            color: 'white',
            height: '52px',
            fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1
          }}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px 16px',
  marginBottom: '12px',
  border: '1px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '15px',
  fontFamily: 'inherit'
};
```

---

## Icon Mappings

### Phone Icons (options via socialIconStyles.phone)

```javascript
const PHONE_ICONS = [
  0: <PhoneIcon />,
  1: <PhoneInTalkIcon />,
  2: <PhoneIPhoneIcon />,
  3: <FontAwesomeIcon icon={faPhone} />
];
```

### Email Icons

```javascript
const EMAIL_ICONS = [
  0: <EmailIcon />,
  1: <MailIcon />,
  2: <MarkEmailUnreadIcon />,
  3: <FontAwesomeIcon icon={faEnvelope} />
];
```

### Website Icons

```javascript
const WEBSITE_ICONS = [
  0: <FontAwesomeIcon icon={faGlobe} />,
  1: <LanguageIcon />,
  2: <PublicIcon />,
  3: <LinkIcon />
];
```

### Social Media Icons

```javascript
const INSTAGRAM_ICONS = [
  0: <FontAwesomeIcon icon={faInstagram} />,
  1: <FontAwesomeIcon icon={faSquareInstagram} />
];

const LINKEDIN_ICONS = [
  0: <FontAwesomeIcon icon={faLinkedin} />,
  1: <FontAwesomeIcon icon={faLinkedinIn} />
];

const FACEBOOK_ICONS = [
  0: <FontAwesomeIcon icon={faFacebook} />,
  1: <FontAwesomeIcon icon={faFacebookF} />,
  2: <FontAwesomeIcon icon={faSquareFacebook} />
];

const WHATSAPP_ICONS = [
  0: <FontAwesomeIcon icon={faWhatsapp} />,
  1: <MessageIcon />
];
```

---

## URL Schemes

### How to Open Different Services

```javascript
// Phone Call
tel: + number
Example: tel:+919999999999

// Email
mailto: + email
Example: mailto:user@example.com

// Website
Direct URL (with https://)
Example: https://example.com

// WhatsApp Chat
https://wa.me/ + number
Example: https://wa.me/919999999999

// Instagram Profile
Direct URL
Example: https://instagram.com/username

// LinkedIn Profile
Direct URL
Example: https://linkedin.com/in/username

// Facebook Profile
Direct URL
Example: https://facebook.com/username
```

### Implementation

```javascript
const launchUrl = (url) => {
  // Format URL if needed
  let formattedUrl = url;
  if (!url.startsWith('http://') &&
      !url.startsWith('https://') &&
      !url.startsWith('tel:') &&
      !url.startsWith('mailto:')) {
    formattedUrl = 'https://' + url;
  }

  // Open in new tab
  window.open(formattedUrl, '_blank');
};
```

---

## Data Update Flow (Edit → View)

### How Changes in Edit Mode Reflect in View

1. **User edits in Flutter Edit Screen**
   - Changes socialLinks, buttons, colors, etc.
   - Modifies `_editDesign` object

2. **User clicks "Save Changes"**
   - Calls `_authService.updateUserDesign(userId, designJson)`
   - Sends PATCH request:
     ```
     PATCH /api/users/{userId}
     {
       "Design": { ...cardDesign.toJson() }
     }
     ```

3. **Backend stores in database**
   - Updates `users.Design` JSONB column
   - User record now has updated design

4. **Web app fetches updated user**
   - Calls `GET /api/users/{userId}`
   - Receives updated `Design` object

5. **React re-renders with new data**
   - Components automatically update with new design
   - Social icons, buttons, form config all reflect changes

### Implementation in React

```javascript
useEffect(() => {
  // Poll for updates every 5 seconds (optional)
  const interval = setInterval(() => {
    fetchUserProfile();
  }, 5000);

  return () => clearInterval(interval);
}, [userId]);

// Or use WebSocket for real-time updates
useEffect(() => {
  const socket = new WebSocket(`ws://api.example.com/users/${userId}/updates`);
  
  socket.onmessage = (event) => {
    const updatedUser = JSON.parse(event.data);
    setUser(updatedUser);
  };

  return () => socket.close();
}, [userId]);
```

---

## Important Notes

- **Phone number format for WhatsApp**: Must include country code (e.g., +919999999999)
- **Text color opacity**: Subtitles and secondary text use 80% or 90% of the text color opacity
- **Responsive design**: All widths should be 100% of container, heights fixed only for icons
- **Scrollable**: Entire view is inside a scrollable container (height: auto for content)
- **No header/navigation**: As per requirements, only the view content (no navigation bar)
- **QR Code**: Display vCard download link in QR code
- **Form validation**: Validate before submission, show errors inline
- **Dark/Light backgrounds**: Text color automatically adjusts based on `textColorIndex`

---

## Summary

This view screen is completely data-driven. All UI changes come from the `Design` JSON object, which is modified via the Edit screen and saved to the backend. When replicating in React.js:

1. **Fetch user profile** → Get `Design` object
2. **Render components** → Use design values for styling and data
3. **Handle interactions** → Social icons and buttons open URLs
4. **Submit forms** → POST to `/api/submissions` endpoint
5. **Poll for updates** → Refresh data periodically or use WebSockets

All design specifications (colors, sizes, spacing) are provided above for pixel-perfect replication.
