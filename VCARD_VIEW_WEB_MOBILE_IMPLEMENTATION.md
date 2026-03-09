# vCard View Screen - Complete React.js Implementation Guide

Complete guide for implementing the vCard View Screen in React.js with exact CSS specifications, mobile-responsive design, data flow, and customization handling.

---

## 📋 Table of Contents

1. [Device & Screen Specifications](#device--screen-specifications)
2. [Complete CSS & Design System](#complete-css--design-system)
3. [Data Structure & Customization](#data-structure--customization)
4. [Business Card CSS (Exact Specifications)](#business-card-css-exact-specifications)
5. [Form Submission & Data Flow](#form-submission--data-flow)
6. [Custom Fields Handling](#custom-fields-handling)
7. [Icon Selection & Display](#icon-selection--display)
8. [Complete React Implementation](#complete-react-implementation)

---

## Device & Screen Specifications

### Phone Dimensions (Mobile-First Design)

```
Device: iPhone/Android Mobile Phone
Screen Width: 375px - 430px (standard mobile)
Safe Area Top: 44px (notch/status bar)
Safe Area Bottom: 34px (home indicator)

Content Area:
- Width: 375px
- Padding Left: 24px
- Padding Right: 24px
- Available Content Width: 327px (375 - 48)
- Padding Top: 24px
- Padding Bottom: 16px
```

### Business Card Dimensions (Mobile Exact)

```
Container Height: 25% of viewport height
- For 667px screen: 167px
- For 812px screen: 203px (iPhone X+)
- For 430px width: responsive, adapts to content

Card Content:
- Padding: 20px (all sides)
- Border Radius: 24px
- Avatar Size: 60x60px
- Avatar Border: 3px white
- Gap between avatar & text: 14px
- Icon Size (contact info): 18px
- Font sizes: Name 18px, Title 13px, Contact info 12px
```

### Responsive Breakpoints

```
Mobile: 320px - 480px
- Business card height: 25% viewport
- Padding: 24px sides

Tablet: 481px - 768px
- Business card height: 30% viewport
- Padding: 32px sides

Desktop: 769px +
- Business card height: max 300px
- Padding: 40px sides
- Max container width: 600px (centered)
```

---

## Complete CSS & Design System

### Global Styles

```css
/* Root Colors */
:root {
  /* Text Colors */
  --text-white: #FFFFFF;
  --text-black: #0F172A;
  --text-golden: #FFD700;
  
  /* UI Colors */
  --border-light: #E5E7EB;
  --border-lighter: #E5E7EB;
  --bg-light: #F3F4F6;
  --bg-lighter: #F1F5F9;
  --text-muted: #6B7280;
  --text-hint: #D1D5DB;
  --text-secondary: #9CA3AF;
  
  /* Button Colors */
  --btn-dark: #232323;
  --btn-secondary: #734BFF;
  
  /* Shadows */
  --shadow-card: 0 8px 15px rgba(0, 0, 0, 0.08),
                 0 6px 8px rgba(0, 0, 0, 0.04),
                 -2px -4px 10px rgba(255, 255, 255, 0.2);
  --shadow-soft: 0 2px 6px rgba(0, 0, 0, 0.15);
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 24px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 6px;
  --spacing-md: 8px;
  --spacing-lg: 12px;
  --spacing-xl: 16px;
  --spacing-2xl: 20px;
  --spacing-3xl: 24px;
  --spacing-4xl: 32px;
  --spacing-5xl: 48px;
}

/* Page Container */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: white;
}

.vcard-view-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  /* Safe area spacing */
  padding-top: max(24px, env(safe-area-inset-top));
  padding-bottom: max(16px, env(safe-area-inset-bottom));
  padding-left: max(24px, env(safe-area-inset-left));
  padding-right: max(24px, env(safe-area-inset-right));
  
  /* Prevent scroll jank */
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB white;
}

/* Scrollbar styling (webkit browsers) */
.vcard-view-container::-webkit-scrollbar {
  width: 6px;
}

.vcard-view-container::-webkit-scrollbar-track {
  background: white;
}

.vcard-view-container::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 3px;
}
```

---

## Business Card CSS (Exact Specifications)

### Container & Layout

```css
.business-card {
  width: 100%;
  height: 25vh; /* 25% of viewport height */
  position: relative;
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 24px;
  
  /* Shadows - 3 layers for depth */
  box-shadow: 
    0 8px 15px rgba(0, 0, 0, 0.08),   /* Main depth */
    0 6px 8px rgba(0, 0, 0, 0.04),    /* Side shadow */
    -2px -4px 10px rgba(255, 255, 255, 0.2); /* Highlight */
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

/* Card Background - Gradient or Solid */
.business-card--gradient-0 {
  background: linear-gradient(135deg, #FFB6C1, #E6E6FA, #DDA0DD);
}

.business-card--gradient-1 {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.business-card--gradient-2 {
  background: linear-gradient(135deg, #f7971e, #ffd200);
}

.business-card--gradient-3 {
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
}

/* Custom solid color */
.business-card--solid {
  background: var(--custom-bg-color);
}

/* Custom gradient from 2 colors */
.business-card--custom-gradient {
  background: linear-gradient(135deg, var(--custom-color-1), var(--custom-color-2));
}
```

### Content Structure

```css
.card-content {
  display: flex;
  gap: 14px;
  position: relative;
  z-index: 1;
}

.card-avatar-section {
  flex-shrink: 0;
}

.card-info-section {
  flex: 1;
  min-width: 0; /* Allow text overflow handling */
}
```

### Avatar Styling

```css
.avatar {
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  border-radius: 50%;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.avatar--with-image {
  background-image: var(--avatar-image-url);
}

.avatar--initials {
  background: linear-gradient(135deg, #FFC169, #FFED4B);
  color: white;
  font-size: 28px;
  font-weight: 600;
}

.avatar-initials-text {
  font-size: 28px;
  font-weight: 600;
  color: white;
  text-align: center;
}
```

### Name & Title Text

```css
.card-name {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 4px;
  word-break: break-word;
  
  /* Text color from design.textColorIndex */
  color: var(--text-color);
}

.card-title {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  opacity: 0.8;
  
  /* Same color as name, 80% opacity */
  color: var(--text-color);
}
```

### Contact Info (Phone/Email)

```css
.card-contact-info {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-top: 12px;
}

.card-contact-info:first-of-type {
  margin-bottom: 6px;
}

.card-contact-icon {
  font-size: 16px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  /* Icon color - text color with 90% opacity */
  color: var(--text-color);
  opacity: 0.9;
}

.card-contact-text {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--text-color);
  opacity: 0.9;
  margin: 0;
  word-break: break-all;
  flex: 1;
}
```

### QR Code Section

```css
.card-qr-container {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 90px;
  height: 90px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.qr-code-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}
```

### Text Color CSS Variables

```css
/* Dynamic text color based on design.textColorIndex */

.text-color--white {
  --text-color: #FFFFFF;
}

.text-color--black {
  --text-color: #0F172A;
}

.text-color--golden {
  --text-color: #FFD700;
}

/* Apply to card */
.business-card.text-color--white {
  --text-color: #FFFFFF;
}

.business-card.text-color--black {
  --text-color: #0F172A;
}

.business-card.text-color--golden {
  --text-color: #FFD700;
}
```

---

## Data Structure & Customization

### How Customization Works

```
┌─────────────────────────────────────────────┐
│  Flutter App - Edit Mode                    │
│  User changes:                              │
│  - Gradient/Colors (gradientIndex)          │
│  - Text Color (textColorIndex)              │
│  - Social Links (socialLinks)               │
│  - Icon Styles (socialIconStyles)           │
│  - Buttons (buttons array)                  │
│  - Form Config (contactForm)                │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
         Save to Backend (PATCH)
         POST /api/users/{userId}
         Body: { Design: { ...toJson() } }
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Supabase Database                          │
│  users.Design (JSONB column)                │
│                                             │
│  Updated with new values                    │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
    Web App fetches updated user profile
    GET /api/users/{userId}
    Response includes updated Design object
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  React.js View Screen                       │
│  Receives updated Design JSON               │
│  Re-renders with new:                       │
│  - Gradient/Colors                          │
│  - Text Color                               │
│  - Social Icons (with user selections)      │
│  - Buttons                                  │
│  - Form Fields                              │
└─────────────────────────────────────────────┘
```

### CardDesign JSON Structure (Complete)

```json
{
  "card": {
    "gradientIndex": 1,
    "textColorIndex": 0,
    "customBackgroundColors": null,
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
```

### User-Selected Icon Styles

The `socialIconStyles` object stores which icon option the user selected for each social link:

```javascript
// User selected different icons for each social link
const socialIconStyles = {
  phone: 2,        // User selected 3rd icon (phone_iphone)
  email: 1,        // User selected 2nd icon (mail)
  website: 0,      // User selected 1st icon (globe)
  instagram: 1,   // User selected 2nd icon (square_instagram)
  linkedin: 0,    // User selected 1st icon (linkedin)
  facebook: 2,    // User selected 3rd icon (square_facebook)
  whatsapp: 0     // User selected 1st icon (whatsapp)
};

// Display logic: Get icon from array using the index
const ICON_OPTIONS = {
  phone: [Icons.phone, Icons.phone_in_talk, Icons.phone_iphone, FontAwesomeIcons.phone],
  email: [Icons.email, Icons.mail, Icons.mark_email_unread, FontAwesomeIcons.envelope],
  website: [FontAwesomeIcons.globe, Icons.language, Icons.public, Icons.link],
  instagram: [FontAwesomeIcons.instagram, FontAwesomeIcons.squareInstagram],
  linkedin: [FontAwesomeIcons.linkedin, FontAwesomeIcons.linkedinIn],
  facebook: [FontAwesomeIcons.facebook, FontAwesomeIcons.facebookF, FontAwesomeIcons.squareFacebook],
  whatsapp: [FontAwesomeIcons.whatsapp, Icons.message]
};

// When rendering in web:
const selectedPhoneIcon = ICON_OPTIONS.phone[socialIconStyles.phone];
// Result: Icons.phone_iphone (user's 3rd choice)
```

---

## Icon Selection & Display

### Available Icons Per Social Link

```javascript
{
  // Phone: 4 options
  phone: [
    { id: 0, name: 'Phone', icon: 'phone' },
    { id: 1, name: 'Phone In Talk', icon: 'phone-in-talk' },
    { id: 2, name: 'iPhone', icon: 'phone-iphone' },
    { id: 3, name: 'Phone FA', icon: 'fa-phone' }
  ],
  
  // Email: 4 options
  email: [
    { id: 0, name: 'Email', icon: 'email' },
    { id: 1, name: 'Mail', icon: 'mail' },
    { id: 2, name: 'Unread', icon: 'mark-email-unread' },
    { id: 3, name: 'Envelope', icon: 'fa-envelope' }
  ],
  
  // Website: 4 options
  website: [
    { id: 0, name: 'Globe', icon: 'fa-globe' },
    { id: 1, name: 'Language', icon: 'language' },
    { id: 2, name: 'Public', icon: 'public' },
    { id: 3, name: 'Link', icon: 'link' }
  ],
  
  // Instagram: 2 options
  instagram: [
    { id: 0, name: 'Instagram', icon: 'fa-instagram' },
    { id: 1, name: 'Square Instagram', icon: 'fa-square-instagram' }
  ],
  
  // LinkedIn: 2 options
  linkedin: [
    { id: 0, name: 'LinkedIn', icon: 'fa-linkedin' },
    { id: 1, name: 'LinkedIn In', icon: 'fa-linkedin-in' }
  ],
  
  // Facebook: 3 options
  facebook: [
    { id: 0, name: 'Facebook', icon: 'fa-facebook' },
    { id: 1, name: 'Facebook F', icon: 'fa-facebook-f' },
    { id: 2, name: 'Square Facebook', icon: 'fa-square-facebook' }
  ],
  
  // WhatsApp: 2 options
  whatsapp: [
    { id: 0, name: 'WhatsApp', icon: 'fa-whatsapp' },
    { id: 1, name: 'Message', icon: 'message' }
  ]
}
```

### How to Render User-Selected Icons

```javascript
// In React component
const getIconForSocialLink = (linkType, design) => {
  const ICON_MAP = {
    phone: ['📱', '📞', '☎️', '📱'],      // Font Awesome icons
    email: ['✉️', '📧', '📬', '✉️'],
    website: ['🌐', '🌍', '🌎', '🔗'],
    instagram: ['📷', '📸'],
    linkedin: ['💼', '💼'],
    facebook: ['👍', 'f', '👍'],
    whatsapp: ['💬', '💭']
  };
  
  const icons = ICON_MAP[linkType];
  const selectedIndex = design.socialIconStyles?.[linkType] || 0;
  return icons[selectedIndex] || icons[0];
};

// Usage in component
<SocialIcon
  onClick={() => launchUrl(urlScheme)}
  icon={getIconForSocialLink('phone', design)}
/>
```

---

## Form Submission & Data Flow

### Contact Form Submission Process

#### 1. Form Data Structure (What Gets Sent)

```javascript
// When user submits form
const formSubmissionPayload = {
  ownerId: "user-123",                    // Profile owner ID
  submittedBy: "visitor-or-user-id",     // Who submitted (optional)
  name: "John Smith",
  email: "john@example.com",
  phone: "+91 8888888888",
  customFields: [
    {
      id: "field-1",
      label: "Company Name",
      type: "text",
      required: false,
      value: "Acme Corp"
    },
    {
      id: "field-2",  
      label: "Message",
      type: "text",
      required: true,
      value: "I'm interested in your services"
    }
  ],
  source: "vcard_view",                   // Where submission came from
  submittedAt: "2024-01-15T10:30:00Z"    // Timestamp
};
```

#### 2. Backend Storage (Supabase Table)

```sql
-- contact_form_submissions table structure

TABLE: contact_form_submissions
{
  id: UUID primary key,
  owner_id: UUID,                    -- User who owns the vCard
  submitted_by: UUID,                -- Who submitted (can be null)
  name: VARCHAR,
  email: VARCHAR (nullable),
  phone: VARCHAR (nullable),
  custom_fields: JSONB,              -- Array of custom field responses
  source: VARCHAR,                   -- 'vcard_view', 'flutter', etc.
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

#### 3. API Endpoint

```
POST /api/submissions

Request Body:
{
  "ownerId": "user-123",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+91 8888888888",
  "customFields": [...],
  "source": "vcard_view"
}

Response (Success):
{
  "id": "submission-123",
  "ownerId": "user-123",
  "name": "John Smith",
  "createdAt": "2024-01-15T10:30:00Z",
  "status": "received"
}

Response (Error):
{
  "error": "Validation failed",
  "message": "Email is required"
}
```

#### 4. React Implementation

```javascript
const handleFormSubmit = async (formData) => {
  // Validate required fields
  if (!formData.name) {
    showError('Name is required');
    return;
  }
  
  if (contactForm.mandatoryField === 'email' && !formData.email) {
    showError('Email is required');
    return;
  }
  
  if (contactForm.mandatoryField === 'phone' && !formData.phone) {
    showError('Phone is required');
    return;
  }
  
  // Check custom required fields
  for (const field of contactForm.customFields) {
    if (field.required && !formData.customFields[field.id]) {
      showError(`${field.label} is required`);
      return;
    }
  }
  
  // Build submission payload
  const payload = {
    ownerId: user.id,
    name: formData.name,
    email: formData.email || null,
    phone: formData.phone || null,
    customFields: contactForm.customFields.map(field => ({
      id: field.id,
      label: field.label,
      type: field.fieldType,
      required: field.required,
      value: formData.customFields[field.id] || ''
    })),
    source: 'vcard_view'
  };
  
  try {
    setSubmitting(true);
    const response = await axios.post('/api/submissions', payload);
    
    // Success
    showSuccess('Thanks! Your details were sent.');
    clearForm();
    
  } catch (error) {
    showError('Submission failed: ' + error.message);
  } finally {
    setSubmitting(false);
  }
};
```

---

## Custom Fields Handling

### What Are Custom Fields?

Custom fields are additional form inputs the user adds in Edit mode. Examples:
- "What is your company?"
- "What is your budget?"
- "Additional message"

### Custom Field Structure

```json
{
  "id": "field-1",
  "label": "Company Name",
  "fieldType": "text",
  "required": false
}
```

**Properties:**
- `id`: Unique identifier (UUID or random string)
- `label`: Display name shown to user
- `fieldType`: "text" | "email" | "number"
- `required`: Boolean, whether field must be filled

### How Custom Fields Flow to Web

#### 1. Edit Mode (Flutter)
User adds custom field in Edit screen:
- "Company Name" (text, not required)
- "Budget" (number, required)

#### 2. Saves to Backend
```json
{
  "contactForm": {
    "enabled": true,
    "customFields": [
      {
        "id": "field-1",
        "label": "Company Name",
        "fieldType": "text",
        "required": false
      },
      {
        "id": "field-2",
        "label": "Budget",
        "fieldType": "number",
        "required": true
      }
    ]
  }
}
```

#### 3. Web Fetches & Renders
```javascript
// In React useEffect
const fetchUserProfile = async () => {
  const response = await axios.get(`/api/users/${userId}`);
  const design = response.data.Design;
  
  // Extract custom fields
  const customFields = design.contactForm.customFields;
  // customFields = [{id: "field-1", label: "Company Name", ...}, ...]
  
  // Render form with these fields
  customFields.forEach(field => {
    renderInputField(field);
  });
};
```

#### 4. Form Submission
```javascript
// User fills out form including custom fields and submits
const customFieldValues = {
  "field-1": "Acme Corp",     // User's input for Company Name
  "field-2": "50000"          // User's input for Budget
};

// Send to backend
const payload = {
  customFields: [
    {
      id: "field-1",
      label: "Company Name",
      type: "text",
      required: false,
      value: "Acme Corp"
    },
    {
      id: "field-2",
      label: "Budget",
      type: "number",
      required: true,
      value: "50000"
    }
  ]
};
```

### CSS for Custom Fields

```css
.custom-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.custom-field-label {
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
}

.custom-field-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.custom-field-input:focus {
  outline: none;
  border-color: #E5E7EB;
  box-shadow: 0 0 0 2px rgba(115, 75, 255, 0.1);
}

.custom-field-input[type="email"] {
  /* Email specific styling */
}

.custom-field-input[type="number"] {
  /* Number specific styling */
}
```

---

## Social Icons Row CSS

```css
.social-icons-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.social-icon-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
}

.social-icon-button:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.social-icon-button:active {
  transform: scale(0.95);
}

.social-icon-button svg,
.social-icon-button i {
  font-size: 22px;
  width: 22px;
  height: 22px;
  color: #1F2937;
}

/* Icon styling when inactive (no value) */
.social-icon-button.inactive svg,
.social-icon-button.inactive i {
  color: #D3D4D6;
  opacity: 0.5;
}
```

---

## Action Buttons CSS

```css
.action-buttons-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 48px;
}

.action-button {
  width: 100%;
  height: 52px;
  padding: 12px 24px;
  background: #232323;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1;
}

.action-button:hover {
  background: #1a1a1a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-button:active {
  transform: scale(0.98);
}

.action-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-button-arrow {
  font-size: 18px;
  margin-left: auto;
}

.action-button-default .action-button-arrow {
  display: inline;
}

.action-button-secondary .action-button-arrow {
  display: none;
}
```

---

## Contact Form CSS

```css
.contact-form-section {
  margin-bottom: 48px;
  text-align: center;
}

.form-header {
  margin-bottom: 32px;
}

.form-title {
  font-size: 20px;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 8px 0;
}

.form-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
  min-height: 48px;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #D1D5DB;
}

.form-input:focus {
  outline: none;
  border-color: #E5E7EB;
  box-shadow: 0 0 0 2px rgba(115, 75, 255, 0.1);
}

.form-submit-button {
  width: 100%;
  height: 52px;
  margin-top: 4px;
  padding: 12px 24px;
  background: #232323;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.form-submit-button:hover:not(:disabled) {
  background: #1a1a1a;
}

.form-submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

## Complete React Implementation

### 1. Main View Component

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const VCardViewScreen = ({ userId }) => {
  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customFields: {}
  });

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error || !user) {
    return <div className="error-container">{error || 'User not found'}</div>;
  }

  const design = user.Design || getDefaultDesign();

  return (
    <div className="vcard-view-container">
      <BusinessCard user={user} design={design} />
      <SocialIconsRow design={design} />
      <ActionButtonsSection design={design} />
      {design.contactForm?.enabled && (
        <ContactFormSection
          user={user}
          design={design}
          formData={formData}
          setFormData={setFormData}
          submitting={submitting}
          onSubmit={() => handleFormSubmit(formData, design)}
        />
      )}
      <PoweredBySection />
    </div>
  );

  async function handleFormSubmit() {
    // Validation
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    if (design.contactForm.mandatoryField === 'email' && !formData.email.trim()) {
      alert('Email is required');
      return;
    }

    if (design.contactForm.mandatoryField === 'phone' && !formData.phone.trim()) {
      alert('Phone is required');
      return;
    }

    for (const field of design.contactForm.customFields) {
      if (field.required && !formData.customFields[field.id]?.trim()) {
        alert(`${field.label} is required`);
        return;
      }
    }

    // Submit
    setSubmitting(true);
    try {
      const payload = {
        ownerId: user.id,
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        customFields: design.contactForm.customFields.map(field => ({
          id: field.id,
          label: field.label,
          type: field.fieldType,
          required: field.required,
          value: formData.customFields[field.id] || ''
        })),
        source: 'vcard_view'
      };

      await axios.post('/api/submissions', payload);

      // Success
      alert('Thanks! Your details were sent.');
      setFormData({ name: '', email: '', phone: '', customFields: {} });
    } catch (err) {
      alert('Submission failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }
};

// Helper function
const getDefaultDesign = () => ({
  card: {
    gradientIndex: 0,
    textColorIndex: 0,
    customBackgroundColors: null,
    savedCustomBackgrounds: []
  },
  socialLinks: {},
  socialIconStyles: {},
  socialIconColors: {},
  buttons: [],
  contactForm: {
    enabled: true,
    mandatoryField: 'email',
    showPhone: true,
    showEmail: true,
    customFields: []
  }
});
```

### 2. Business Card Component

```javascript
const BusinessCard = ({ user, design }) => {
  const {
    card = {},
    socialLinks = {}
  } = design;

  const gradientIndex = card.gradientIndex || 0;
  const textColorIndex = card.textColorIndex || 0;
  const customColors = card.customBackgroundColors;

  // Get gradient or solid color
  const bgStyle = getBackgroundStyle(gradientIndex, customColors);
  const textColor = getTextColor(textColorIndex);

  // Get contact info
  const phone = socialLinks.phone || '';
  const email = socialLinks.email || '';

  // Get initials
  const initials = getInitials(user.fullName || 'Contact');

  return (
    <div className={`business-card business-card--gradient-${gradientIndex} text-color--${['white', 'black', 'golden'][textColorIndex]}`}
         style={customColors ? { background: `linear-gradient(135deg, ${customColors[0]}, ${customColors[customColors.length - 1]})` } : {}}>
      
      <div className="card-content">
        {/* Avatar */}
        <div className="card-avatar-section">
          {user.profileImageUrl ? (
            <div 
              className="avatar avatar--with-image"
              style={{ backgroundImage: `url(${user.profileImageUrl})` }}
            />
          ) : (
            <div className="avatar avatar--initials">
              <span className="avatar-initials-text">{initials}</span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="card-info-section">
          <h2 className="card-name">{user.fullName || 'Contact'}</h2>
          <p className="card-title">{user.jobTitle || 'Professional'}</p>

          {/* Phone */}
          {phone && (
            <div className="card-contact-info">
              <span className="card-contact-icon">📱</span>
              <p className="card-contact-text">{phone}</p>
            </div>
          )}

          {/* Email */}
          {email && (
            <div className="card-contact-info">
              <span className="card-contact-icon">✉️</span>
              <p className="card-contact-text">{email}</p>
            </div>
          )}
        </div>
      </div>

      {/* QR Code */}
      {user.vcardUrl && (
        <div className="card-qr-container">
          <QRCode value={user.vcardUrl} size={80} level="L" />
        </div>
      )}
    </div>
  );
};

// Helper functions
const getBackgroundStyle = (gradientIndex, customColors) => {
  if (customColors?.length >= 2) {
    return {
      background: `linear-gradient(135deg, ${customColors[0]}, ${customColors[customColors.length - 1]})`
    };
  }

  const gradients = [
    'linear-gradient(135deg, #FFB6C1, #E6E6FA)',
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f7971e, #ffd200)',
    'linear-gradient(135deg, #e0eafc, #cfdef3)'
  ];

  return { background: gradients[gradientIndex] || gradients[0] };
};

const getTextColor = (index) => {
  const colors = ['#FFFFFF', '#0F172A', '#FFD700'];
  return colors[index] || colors[0];
};

const getInitials = (name) => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();
};
```

### 3. Social Icons Component

```javascript
const SocialIconsRow = ({ design }) => {
  const { socialLinks = {}, socialIconStyles = {} } = design;

  const socialConfig = [
    { key: 'phone', icon: '📱', url: (val) => `tel:${val}` },
    { key: 'email', icon: '✉️', url: (val) => `mailto:${val}` },
    { key: 'website', icon: '🌐', url: (val) => val },
    { key: 'instagram', icon: '📷', url: (val) => val },
    { key: 'linkedin', icon: '💼', url: (val) => val },
    { key: 'facebook', icon: '👍', url: (val) => val },
    { key: 'whatsapp', icon: '💬', url: (val) => `https://wa.me/${val}` }
  ];

  const displayIcons = socialConfig.filter(item => socialLinks[item.key]);

  if (displayIcons.length === 0) return null;

  return (
    <div className="social-icons-container">
      {displayIcons.map(item => (
        <button
          key={item.key}
          className="social-icon-button"
          onClick={() => launchUrl(item.url(socialLinks[item.key]))}
          title={item.key}
        >
          <span style={{ fontSize: '22px' }}>{item.icon}</span>
        </button>
      ))}
    </div>
  );
};

const launchUrl = (url) => {
  try {
    let formattedUrl = url;
    if (!url.startsWith('http://') &&
        !url.startsWith('https://') &&
        !url.startsWith('tel:') &&
        !url.startsWith('mailto:')) {
      formattedUrl = 'https://' + url;
    }
    window.open(formattedUrl, '_blank');
  } catch (error) {
    console.error('Error opening URL:', error);
  }
};
```

### 4. Contact Form Component

```javascript
const ContactFormSection = ({ user, design, formData, setFormData, submitting, onSubmit }) => {
  const { contactForm = {} } = design;

  if (!contactForm.enabled) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      customFields: { ...prev.customFields, [fieldId]: value }
    }));
  };

  return (
    <div className="contact-form-section">
      <div className="form-header">
        <h3 className="form-title">Leave your contact details</h3>
        <p className="form-subtitle">I'll get back to you as soon as possible</p>
      </div>

      <form className="form-content" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        {/* Name - Always shown */}
        <input
          type="text"
          placeholder="Name"
          required
          className="form-input"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />

        {/* Email */}
        {contactForm.showEmail && (
          <input
            type="email"
            placeholder="Email"
            required={contactForm.mandatoryField === 'email'}
            className="form-input"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        )}

        {/* Phone */}
        {contactForm.showPhone && (
          <input
            type="tel"
            placeholder="Phone"
            required={contactForm.mandatoryField === 'phone'}
            className="form-input"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        )}

        {/* Custom Fields */}
        {contactForm.customFields?.map(field => (
          <div key={field.id} className="custom-field">
            <label className="custom-field-label">
              {field.label}
              {field.required && <span style={{ color: 'red' }}> *</span>}
            </label>
            <input
              type={field.fieldType === 'email' ? 'email' : field.fieldType === 'number' ? 'number' : 'text'}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              required={field.required}
              className="custom-field-input"
              value={formData.customFields[field.id] || ''}
              onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="form-submit-button"
        >
          {submitting ? (
            <>
              <div className="form-loading-spinner" />
              <span>Submitting...</span>
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};
```

---

## Complete Communication Flow

### Data Update Flow (Edit → Backend → Web)

```
┌─ Flutter Edit Screen ─────────────────┐
│                                       │
│ User changes Social Icon Style:       │
│ socialIconStyles = {                  │
│   phone: 0,                           │
│   email: 1,  ← Changed from 0 to 1    │
│   ...                                 │
│ }                                     │
│                                       │
│ Clicks "Save Changes"                 │
└─────────────┬─────────────────────────┘
              │
              ▼
    PATCH /api/users/{userId}
    Content-Type: application/json
    
    {
      "Design": {
        "socialIconStyles": {
          "phone": 0,
          "email": 1,
          ...
        },
        ...
      }
    }
              │
              ▼
    ┌─ Supabase Backend ────────────────┐
    │                                   │
    │ Update users.Design column:       │
    │ {                                 │
    │   socialIconStyles: {             │
    │     email: 1  ← Updated           │
    │   },                              │
    │   ...                             │
    │ }                                 │
    │                                   │
    └─────────────┬─────────────────────┘
                  │
                  ▼
    ┌─ React Web App ──────────────────┐
    │                                  │
    │ GET /api/users/{userId}         │
    │                                  │
    │ Receives:                        │
    │ {                                │
    │   Design: {                      │
    │     socialIconStyles: {          │
    │       email: 1  ← Updated icon   │
    │     }                            │
    │   }                              │
    │ }                                │
    │                                  │
    │ Component renders:               │
    │ selectedIcon = ICONS.email[1]    │
    │ = Icons.mail (user's choice)     │
    │                                  │
    │ Social icon displays:            │
    │ 📧 instead of ✉️                 │
    │                                  │
    └──────────────────────────────────┘
```

### Form Submission Data Flow

```
┌─ Web Form ────────────────────────────┐
│                                       │
│ User fills form:                      │
│ - Name: "John Smith"                  │
│ - Email: "john@example.com"           │
│ - Company: "Acme Corp" (custom)       │
│                                       │
│ Clicks Submit                         │
└─────────────┬─────────────────────────┘
              │
              ▼
    POST /api/submissions
    {
      "ownerId": "user-123",
      "name": "John Smith",
      "email": "john@example.com",
      "customFields": [{
        "id": "field-1",
        "label": "Company Name",
        "type": "text",
        "value": "Acme Corp"
      }],
      "source": "vcard_view"
    }
              │
              ▼
    ┌─ Supabase Backend ────────────────┐
    │                                   │
    │ INSERT INTO                       │
    │   contact_form_submissions        │
    │ VALUES (                          │
    │   id: uuid(),                     │
    │   owner_id: 'user-123',           │
    │   name: 'John Smith',             │
    │   email: 'john@example.com',      │
    │   custom_fields: [{...}],         │
    │   source: 'vcard_view',           │
    │   created_at: now()               │
    │ )                                 │
    │                                   │
    │ Card Owner (user-123) receives    │
    │ notification of submission        │
    │                                   │
    └───────────────────────────────────┘
```

---

## Mobile Responsiveness

```css
/* Phone: 320px - 430px */
@media (max-width: 430px) {
  .business-card {
    height: 25vh;
    padding: 20px;
  }
  
  .card-avatar-section {
    width: 60px;
    min-width: 60px;
  }
  
  .social-icons-container {
    gap: 12px;
  }
}

/* Tablet: 431px - 768px */
@media (min-width: 431px) and (max-width: 768px) {
  .vcard-view-container {
    padding-left: 32px;
    padding-right: 32px;
  }
  
  .business-card {
    height: 30vh;
  }
}

/* Desktop: 769px + */
@media (min-width: 769px) {
  .vcard-view-container {
    max-width: 600px;
    padding-left: 40px;
    padding-right: 40px;
  }
  
  .business-card {
    height: 300px;
  }
  
  .social-icons-container {
    gap: 20px;
  }
}
```

---

## Summary

**For Web View Implementation:**

✅ **Mobile-first design** - 375px width with 24px padding
✅ **Responsive business card** - 25% viewport height
✅ **User-selected icons** - Display based on `socialIconStyles` index
✅ **Dynamic custom fields** - Populated from `design.contactForm.customFields`
✅ **Form submission** - POST to `/api/submissions` with all data
✅ **Real-time updates** - Fetch user profile periodically or via WebSocket
✅ **All CSS specifications** - Exact sizes, colors, spacing provided
✅ **No header/navigation** - Pure view screen only

Use the implementation examples and CSS directly in your React project!
