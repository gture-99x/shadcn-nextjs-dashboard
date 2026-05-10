# Authentication

## Overview

The authentication feature provides a complete set of pages and flows for user identity management. All auth pages share a dedicated full-screen centered layout separate from the main dashboard.

**Route group:** `app/(auth)/`

---

## Pages

### Login (`/login`)

Allows existing users to sign in to their account.

**Fields:**
- Email — validated as a proper email address
- Password — minimum 6 characters; rendered as a password input with masking

**Behaviour:**
- Client-side validation via `zod` + `react-hook-form`
- On successful submit, shows a `sonner` toast: "Login successful!"
- Links to `/forgot-password` ("Forgot your password?")
- Links to `/register` ("Sign up")

---

### Register (`/register`)

Allows new users to create an account.

**Fields:**
- First Name — minimum 2 characters
- Last Name — minimum 2 characters
- Email — validated as a proper email address
- Password — minimum 8 characters; rendered as a masked input

**Behaviour:**
- Client-side validation via `zod` + `react-hook-form`
- Primary action: "Create an account" (email/password)
- Secondary action: "Sign up with Google" (outline button, OAuth placeholder)
- On successful submit, shows a `sonner` toast: "Account created!"
- Links to `/login` for existing users

---

### Forgot Password (`/forgot-password`)

Lets users request a password reset link via email.

**Fields:**
- Email — validated as a proper email address

**Behaviour:**
- On submit, shows a `sonner` toast: "Password reset email sent!" with note that the link will only be sent if an account exists
- Links back to `/login`

---

### Email Verification (`/verify-email`)

Informs users to check their inbox after registration.

**Behaviour:**
- Static informational card (no form fields)
- "Resend verification email" button triggers a `sonner` info toast confirming the resend
- "Back to login" link returns the user to `/login`

---

### Setup Two-Factor Authentication (`/setup-2fa`)

Guides users through enabling TOTP-based 2FA.

**Fields:**
- OTP code — 6-digit one-time password entered via an `InputOTP` component (6 slots)

**Behaviour:**
- Displays a QR code placeholder (animated pulse) for scanning with an authenticator app
- Step-by-step instructions shown above the OTP input
- On successful submit, shows a `sonner` toast: "Two-Factor Authentication enabled!"
- Validation: code must be exactly 6 characters

---

## Auth Overview Page (`/dashboard/auth`)

An internal dashboard page that lists all auth-related pages as clickable cards for quick navigation during development/demo.

**Entries shown:**
| Page | Route | Status |
|------|-------|--------|
| Login | `/login` | Ready |
| Register | `/register` | Ready |
| Forgot Password | `/forgot-password` | Ready |
| Email Verification | `/verify-email` | Ready |
| Two-Factor Auth | `/setup-2fa` | Ready |
| API Keys | `/dashboard/settings/api-keys` | Ready |

---

## Layout

- All auth pages are wrapped in a shared `app/(auth)/layout.tsx` that provides a full-screen centered container.
- No sidebar or top navigation is displayed on auth pages.

---

## Validation Rules Summary

| Field | Rule |
|-------|------|
| Email | Must be a valid email format |
| Password (login) | Minimum 6 characters |
| Password (register) | Minimum 8 characters |
| First / Last name | Minimum 2 characters each |
| OTP code | Exactly 6 characters |

---

## Dependencies

- `react-hook-form` — form state management
- `zod` + `@hookform/resolvers/zod` — schema validation
- `sonner` — toast notifications
- `shadcn/ui` — Button, Card, Form, Input, InputOTP components
- `lucide-react` — LogIn, Mail, Lock, ShieldCheck, MailCheck icons
