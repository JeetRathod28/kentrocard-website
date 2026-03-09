# Social Icon Styles Sync Guide (Flutter to React)

This document explains how `socialIconStyles` works and how to sync icon selections from the Flutter app to your React website using lucide-react.

---

## 1. What is `socialIconStyles`?

`socialIconStyles` is a **mapping object** where each social platform has an **index** that determines which icon variation is displayed.

### Example:
```json
"socialIconStyles": {
  "email": 0,           // Use 1st email icon option
  "phone": 0,           // Use 1st phone icon option
  "website": 2,         // Use 3rd website icon option
  "linkedin": 0,        // Use 1st LinkedIn icon option
  "instagram": 0,       // Use 1st Instagram icon option
  "facebook": 0,        // Use 1st Facebook icon option
  "whatsapp": 0         // Use 1st WhatsApp icon option
}
```

---

## 2. Icon Options by Platform

Each platform has multiple icon options. The index value (0, 1, 2, etc.) selects which icon to display.

### Phone Icons (4 options)
| Index | Flutter Icon          | Lucide-React Icon      |
|-------|----------------------|------------------------|
| 0     | Icons.phone          | `Phone`                |
| 1     | Icons.phone_in_talk  | `PhoneCall`            |
| 2     | Icons.phone_iphone   | `Smartphone`           |
| 3     | FontAwesome.phone    | `PhoneHandset`         |

### Email Icons (4 options)
| Index | Flutter Icon              | Lucide-React Icon    |
|-------|--------------------------|----------------------|
| 0     | Icons.email              | `Mail`               |
| 1     | Icons.mail               | `Mail`               |
| 2     | Icons.mark_email_unread  | `MailOpen`           |
| 3     | FontAwesome.envelope     | `MailBox`            |

### Website Icons (4 options)
| Index | Flutter Icon           | Lucide-React Icon |
|-------|----------------------|-------------------|
| 0     | FontAwesome.globe    | `Globe`           |
| 1     | Icons.language       | `Globe`           |
| 2     | Icons.public         | `Globe2`          |
| 3     | Icons.link           | `Link`            |

### LinkedIn Icons (2 options)
| Index | Flutter Icon              | Lucide-React Icon |
|-------|--------------------------|-------------------|
| 0     | FontAwesome.linkedin      | `Linkedin`        |
| 1     | FontAwesome.linkedinIn    | `Linkedin`        |

### Instagram Icons (2 options)
| Index | Flutter Icon                | Lucide-React Icon |
|-------|---------------------------|-------------------|
| 0     | FontAwesome.instagram       | `Instagram`       |
| 1     | FontAwesome.squareInstagram | `Instagram`       |

### Facebook Icons (3 options)
| Index | Flutter Icon                 | Lucide-React Icon |
|-------|----------------------------|-------------------|
| 0     | FontAwesome.facebook         | `Facebook`        |
| 1     | FontAwesome.facebookF        | `Facebook`        |
| 2     | FontAwesome.squareFacebook   | `Facebook`        |

### WhatsApp Icons (2 options)
| Index | Flutter Icon           | Lucide-React Icon |
|-------|----------------------|-------------------|
| 0     | FontAwesome.whatsapp   | `MessageCircle`   |
| 1     | Icons.message          | `MessageSquare`   |

---

## 3. React Implementation with Lucide-React

### Step 1: Install lucide-react (if not already installed)
```bash
npm install lucide-react
```

### Step 2: Create Icon Mapping File

Create a file named `iconMapping.ts` or `iconMapping.js`:

```typescript
import {
  Phone, PhoneCall, Smartphone, PhoneHandset,
  Mail, MailOpen, MailBox,
  Globe, Globe2, Link,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle, MessageSquare,
} from 'lucide-react';

// Map of platform -> array of icon components
export const ICON_STYLES = {
  phone: [Phone, PhoneCall, Smartphone, PhoneHandset],
  email: [Mail, Mail, MailOpen, MailBox],
  website: [Globe, Globe, Globe2, Link],
  linkedin: [Linkedin, Linkedin],
  instagram: [Instagram, Instagram],
  facebook: [Facebook, Facebook, Facebook],
  whatsapp: [MessageCircle, MessageSquare],
};

/**
 * Get the correct icon component based on platform and style index
 * @param platform - The social platform (phone, email, website, etc.)
 * @param styleIndex - The icon style index from socialIconStyles
 * @returns The icon component to render
 */
export function getIconComponent(platform: string, styleIndex: number = 0) {
  const icons = ICON_STYLES[platform as keyof typeof ICON_STYLES] || [];
  const clampedIndex = Math.min(styleIndex, icons.length - 1);
  return icons[clampedIndex];
}
```

### Step 3: Use in Your React Component

```jsx
import { getIconComponent } from './iconMapping';

export function SocialLinks({ design }) {
  const { socialLinks, socialIconStyles } = design || {};

  const socialPlatforms = [
    { key: 'phone', label: 'Phone', url: socialLinks?.phone },
    { key: 'email', label: 'Email', url: socialLinks?.email },
    { key: 'website', label: 'Website', url: socialLinks?.website },
    { key: 'linkedin', label: 'LinkedIn', url: socialLinks?.linkedin },
    { key: 'instagram', label: 'Instagram', url: socialLinks?.instagram },
    { key: 'facebook', label: 'Facebook', url: socialLinks?.facebook },
    { key: 'whatsapp', label: 'WhatsApp', url: socialLinks?.whatsapp },
  ];

  return (
    <div className="social-links">
      {socialPlatforms.map(({ key, label, url }) => {
        if (!url) return null;

        // Get the icon style index from socialIconStyles (default to 0)
        const styleIndex = socialIconStyles?.[key] || 0;
        const IconComponent = getIconComponent(key, styleIndex);

        return (
          <a key={key} href={url} title={label} className="social-icon">
            <IconComponent size={24} />
          </a>
        );
      })}
    </div>
  );
}
```

### Step 4: Full Working Example with Styling

```jsx
import React from 'react';
import { getIconComponent } from './iconMapping';

export function VCardSocialLinks({ design, iconColor }) {
  const { socialLinks, socialIconStyles } = design || {};

  const socialPlatforms = [
    { key: 'email', url: socialLinks?.email },
    { key: 'phone', url: socialLinks?.phone },
    { key: 'website', url: socialLinks?.website },
    { key: 'linkedin', url: socialLinks?.linkedin },
    { key: 'instagram', url: socialLinks?.instagram },
    { key: 'facebook', url: socialLinks?.facebook },
    { key: 'whatsapp', url: socialLinks?.whatsapp },
  ];

  return (
    <div className="social-icons-container">
      {socialPlatforms.map(({ key, url }) => {
        if (!url) return null;

        // Get the style index for this platform
        const styleIndex = socialIconStyles?.[key] || 0;
        
        // Get the correct icon component
        const IconComponent = getIconComponent(key, styleIndex);

        // Handle URL based on platform
        const href = key === 'email' ? `mailto:${url}` : url;

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            style={{ color: iconColor }}
          >
            <IconComponent size={28} strokeWidth={1.5} />
          </a>
        );
      })}
    </div>
  );
}
```

### Step 5: CSS Example

```css
.social-icons-container {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 20px;
}

.social-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: inherit;
  text-decoration: none;
}

.social-icon:hover {
  background-color: rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}
```

---

## 4. How to Sync from Flutter App

1. **Fetch design data** from your Supabase `profiles` table.
2. **Extract** `socialIconStyles` and `socialLinks` from the design JSON.
3. **Pass** both to your React component.
4. **The component automatically renders** the correct icon based on the index stored in `socialIconStyles`.

### Example API Response:
```json
{
  "id": "user-123",
  "design": {
    "socialLinks": {
      "email": "user@example.com",
      "phone": "+1234567890",
      "website": "https://example.com",
      "linkedin": "https://linkedin.com/in/user"
    },
    "socialIconStyles": {
      "email": 0,
      "phone": 1,
      "website": 2,
      "linkedin": 0
    }
  }
}
```

### Render in React:
```jsx
const { design } = userData;
<VCardSocialLinks design={design} iconColor="#7B4FFF" />
```

✅ **This will display:**
- Email icon as index 0 (Mail)
- Phone icon as index 1 (PhoneCall)
- Website icon as index 2 (Globe2)
- LinkedIn icon as index 0 (Linkedin)

---

## 5. Key Takeaway

- **Every social platform has icon options (stored in arrays).**
- **The index in `socialIconStyles` selects which icon to show.**
- **React component reads the index and renders the correct lucide-react icon.**
- **No hardcoding—just follow the mapping!**

---

**Use this code directly. It will sync perfectly with your Flutter app's icon selections.**
