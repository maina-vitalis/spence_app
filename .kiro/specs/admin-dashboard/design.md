# Design Document

## Overview

The admin dashboard will be a secure, responsive interface built using Next.js App Router with a dedicated (admin) route group. It will utilize React Sidebar components for navigation and provide full CRUD functionality for managing portfolio projects. The design will maintain consistency with the existing Spence Creations brand while providing a clean, functional administrative interface.

## Architecture

### Route Structure

```
src/app/(admin)/
├── admin/
│   ├── layout.tsx          # Admin layout with sidebar
│   ├── page.tsx           # Admin dashboard home
│   ├── projects/
│   │   ├── page.tsx       # Projects list view
│   │   ├── new/
│   │   │   └── page.tsx   # Add new project form
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx # Edit project form
│   └── blog/
│       ├── page.tsx       # Blog posts list view
│       ├── new/
│       │   └── page.tsx   # Add new blog post form
│       └── [id]/
│           └── edit/
│               └── page.tsx # Edit blog post form
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts   # NextAuth configuration
```

### Authentication Flow

- NextAuth.js for secure authentication
- Multiple provider support (Google, GitHub, Email)
- JWT tokens with secure session management
- Protected routes using NextAuth middleware
- Role-based access control for admin users

### Data Management

- Projects and blog posts data managed through Prisma ORM with PostgreSQL database
- Server actions for CRUD operations on both projects and blog posts
- Form validation using React Hook Form + Zod
- Optimistic updates for better UX
- File upload handling for images and media
- Database migrations and schema management with Prisma

## Components and Interfaces

### Core Components

#### AdminLayout

```typescript
interface AdminLayoutProps {
  children: React.ReactNode;
}
```

- Wraps all admin pages
- Contains sidebar navigation
- Handles responsive behavior
- Manages authentication state

#### AdminSidebar

```typescript
interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}
```

- Navigation menu with sections: Dashboard, Projects, Blog, Settings
- Collapsible on mobile devices
- Active state indication
- Logout functionality

#### ProjectForm

```typescript
interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
```

- Reusable form for add/edit operations
- File upload for project images
- URL validation for live/GitHub links
- Form state management

#### ProjectCard (Admin)

```typescript
interface AdminProjectCardProps {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
```

- Displays project information
- Quick action buttons (Edit, Delete)
- Confirmation dialogs for destructive actions

#### BlogForm

```typescript
interface BlogFormProps {
  post?: BlogPost;
  onSubmit: (data: BlogFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
```

- Rich text editor for blog content
- SEO fields (meta description, keywords)
- Category and tag management
- Featured image upload
- Draft/publish status control

#### BlogCard (Admin)

```typescript
interface AdminBlogCardProps {
  post: BlogPost;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}
```

- Displays blog post information
- Status indicator (draft/published)
- Quick action buttons (Edit, Delete, Toggle Status)
- Preview functionality

### Data Models

#### Project Interface

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### ProjectFormData

```typescript
interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  tags: string[];
}
```

#### BlogPost Interface

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  status: "draft" | "published";
  categories: string[];
  tags: string[];
  metaDescription?: string;
  metaKeywords?: string[];
  author: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### BlogFormData

```typescript
interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  status: "draft" | "published";
  categories: string[];
  tags: string[];
  metaDescription?: string;
  metaKeywords?: string[];
}
```

## Error Handling

### Client-Side Error Handling

- Form validation errors displayed inline
- Network error handling with retry options
- Loading states for all async operations
- Toast notifications for success/error feedback

### Server-Side Error Handling

- Input validation on server actions
- File upload error handling
- Database operation error handling
- Proper HTTP status codes and error messages

## Testing Strategy

### Unit Testing

- Component rendering tests
- Form validation logic tests
- Utility function tests
- Server action tests

### Integration Testing

- Authentication flow testing
- CRUD operation end-to-end tests
- File upload functionality tests
- Navigation and routing tests

### Manual Testing

- Cross-browser compatibility
- Responsive design testing
- Accessibility testing
- Performance testing

## Security Considerations

### Authentication

- Secure session management
- CSRF protection
- Rate limiting for login attempts
- Secure cookie configuration

### Data Validation

- Server-side input validation
- File upload restrictions
- SQL injection prevention (future database integration)
- XSS protection

### Access Control

- Route-level authentication checks
- Middleware-based protection
- Proper error handling without information leakage

## UI/UX Design

### Design System

- Consistent with existing Spence Creations branding
- Dark/light theme support
- Responsive breakpoints matching main site
- Accessible color contrasts and focus states

### Navigation

- Sidebar with clear section organization
- Breadcrumb navigation for deep pages
- Mobile-first responsive design
- Keyboard navigation support

### Forms

- Clear field labels and validation messages
- Progressive enhancement
- Auto-save functionality (future enhancement)
- Drag-and-drop file uploads

### Feedback Systems

- Loading spinners for async operations
- Success/error toast notifications
- Confirmation dialogs for destructive actions
- Empty states with helpful messaging

## Performance Considerations

### Code Splitting

- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components

### Data Loading

- Server-side rendering where appropriate
- Optimistic updates for better perceived performance
- Efficient re-fetching strategies
- Image optimization for project thumbnails

### Caching

- Static generation for non-dynamic content
- Browser caching for assets
- Service worker for offline functionality (future)

## Accessibility

### WCAG Compliance

- Proper heading hierarchy
- Alt text for images
- Keyboard navigation
- Screen reader compatibility
- Focus management
- Color contrast compliance

### Semantic HTML

- Proper form labels
- ARIA attributes where needed
- Semantic markup structure
- Skip navigation links
