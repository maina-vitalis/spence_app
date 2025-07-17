# Authentication Setup Guide

## Overview

The admin dashboard is secured using NextAuth.js with Google and GitHub OAuth providers. Only authorized admin emails can access the dashboard.

## Setup Instructions

### 1. Environment Variables

Update your `.env` file with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Admin Emails (comma-separated)
ADMIN_EMAILS=admin@example.com,vitalis@spencecreations.co.ke

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 2. OAuth Provider Setup

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client IDs
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to your `.env` file

#### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000` (development)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env` file

### 3. Admin Email Configuration

Update the `ADMIN_EMAILS` environment variable with comma-separated email addresses that should have admin access:

```env
ADMIN_EMAILS=admin@example.com,another-admin@example.com
```

### 4. Cloudinary Setup (for image uploads)

1. Create a [Cloudinary account](https://cloudinary.com/)
2. Go to your dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret
3. Add these to your `.env` file

## How Authentication Works

### Route Protection

- All `/admin/*` routes are protected by middleware
- Unauthenticated users are redirected to `/admin/login`
- Users without admin email access are redirected to the home page

### Login Flow

1. User visits `/admin/login`
2. User clicks "Sign in with Google" or "Sign in with GitHub"
3. OAuth provider authenticates the user
4. NextAuth checks if the user's email is in the `ADMIN_EMAILS` list
5. If authorized, user is redirected to `/admin`
6. If not authorized, access is denied

### Session Management

- Sessions are managed using JWT tokens
- User information is available throughout the admin dashboard
- Logout functionality is available in the admin sidebar

## Security Features

1. **Email-based Authorization**: Only specified admin emails can access the dashboard
2. **Route Protection**: Middleware protects all admin routes
3. **Session Validation**: Sessions are validated on each request
4. **Secure Redirects**: Proper redirect handling for authentication flows

## Testing the Setup

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin`
3. You should be redirected to the login page
4. Try signing in with an authorized admin email
5. You should be redirected to the admin dashboard

## Troubleshooting

### Common Issues

1. **"Configuration Error"**: Check that all environment variables are set correctly
2. **"Access Denied"**: Ensure your email is in the `ADMIN_EMAILS` list
3. **OAuth Errors**: Verify your OAuth provider settings and callback URLs
4. **Session Issues**: Clear browser cookies and try again

### Debug Mode

To enable debug mode, add this to your `.env`:

```env
NEXTAUTH_DEBUG=true
```

This will provide detailed logs in the console for troubleshooting authentication issues.
