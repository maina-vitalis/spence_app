# Implementation Plan

- [x] 1. Set up NextAuth authentication system

  - Install and configure NextAuth.js with Google and GitHub providers
  - Create NextAuth API route and configuration
  - Set up environment variables for OAuth credentials
  - Create middleware for protecting admin routes
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 2. Create admin route structure and layout

  - [x] 2.1 Create (admin) route group structure

    - Set up src/app/(admin)/admin directory structure
    - Create layout.tsx for admin pages with sidebar integration
    - Create main admin dashboard page
    - _Requirements: 1.3, 8.1, 8.2_

  - [x] 2.2 Implement AdminSidebar component
    - Build responsive sidebar navigation using React Sidebar components
    - Add navigation items for Dashboard, Projects, Blog, Settings
    - Implement collapsible functionality for mobile devices
    - Add active state indication and logout functionality
    - _Requirements: 1.3, 8.1, 8.4_

- [x] 3. Implement project management functionality

  - [x] 3.1 Create projects list page

    - Build projects listing page displaying all current projects
    - Implement AdminProjectCard component with edit/delete actions
    - Add empty state handling and loading states
    - Create confirmation dialogs for delete operations
    - _Requirements: 2.1, 2.2, 2.3, 5.1, 5.2, 5.3_

  - [x] 3.2 Build project form component

    - Create reusable ProjectForm component for add/edit operations
    - Implement form validation using React Hook Form and Zod
    - Add file upload functionality for project images
    - Include URL validation for live and GitHub links
    - Add tags input and featured project toggle
    - _Requirements: 3.1, 3.2, 3.3, 4.1, 4.2_

  - [x] 3.3 Create add new project page

    - Build new project creation page using ProjectForm component
    - Implement server action for adding projects to JSON data
    - Add success/error handling with toast notifications
    - Redirect to projects list after successful creation
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 3.4 Create edit project page
    - Build edit project page with pre-populated form data
    - Implement server action for updating existing projects
    - Add cancel functionality returning to projects list
    - Handle form validation and error states
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 4. Implement blog management functionality

  - [x] 4.1 Create blog posts list page

    - Build blog posts listing page with status indicators
    - Implement AdminBlogCard component with edit/delete/toggle actions
    - Add filtering by status (draft/published)
    - Create search functionality for blog posts
    - _Requirements: 6.1, 6.4_

  - [x] 4.2 Build blog form component

    - Create BlogForm component with rich text editor
    - Implement SEO fields (meta description, keywords)
    - Add category and tag management
    - Include featured image upload functionality
    - Add draft/publish status control
    - _Requirements: 6.2, 6.3, 6.5_

  - [x] 4.3 Create add new blog post page

    - Build new blog post creation page using BlogForm component
    - Implement server action for adding blog posts to JSON data
    - Add auto-slug generation from title
    - Handle draft saving and publishing workflows
    - _Requirements: 6.2, 6.3, 6.4_

  - [x] 4.4 Create edit blog post page
    - Build edit blog post page with pre-populated form data
    - Implement server action for updating existing blog posts
    - Preserve creation date while updating modified date
    - Add preview functionality for blog posts
    - _Requirements: 6.5_

- [x] 5. Set up database and data management system

  - [x] 5.1 Configure Prisma and PostgreSQL

    - Set up PostgreSQL database (local or cloud)
    - Configure Prisma schema with Project and BlogPost models
    - Run database migrations to create tables
    - Generate Prisma client and test connection
    - _Requirements: 2.1, 3.5, 4.4, 6.1_

  - [x] 5.2 Implement server actions for CRUD operations
    - Create server actions for project CRUD operations using Prisma
    - Create server actions for blog post CRUD operations using Prisma
    - Add proper error handling and validation
    - Implement optimistic updates for better UX
    - _Requirements: 3.5, 4.4, 5.4, 6.4_

- [ ] 6. Add file upload functionality

  - [x] 6.1 Implement image upload system

    - Create file upload component with drag-and-drop support lets use cloudinary
    - Add image validation (size, format, dimensions)
    - Implement image optimization and resizing
    - Create server action for handling file uploads
    - _Requirements: 3.2, 6.2_

  - [ ] 6.2 Create media management
    - Build media library for uploaded images
    - Add image selection modal for forms
    - Implement image deletion and cleanup
    - Add image preview and metadata display
    - _Requirements: 3.2, 6.2_

- [ ] 7. Implement authentication middleware and protection

  - [x] 7.1 Create authentication middleware

    - Set up NextAuth middleware for route protection
    - Add role-based access control for admin users
    - Implement session validation and refresh
    - Add proper error handling for authentication failures
    - _Requirements: 1.1, 1.4, 7.1, 7.3_

  - [ ] 7.2 Add login and logout functionality
    - Create login page with NextAuth providers
    - Implement logout functionality in sidebar
    - Add session management and persistence
    - Handle authentication redirects properly
    - _Requirements: 1.1, 1.2, 7.2, 7.4_

- [ ] 8. Add UI enhancements and feedback systems

  - [ ] 8.1 Implement toast notifications

    - Add toast notification system using Sonner
    - Create success/error/loading toast messages
    - Implement toast notifications for all CRUD operations
    - Add proper toast positioning and styling
    - _Requirements: 3.3, 4.4, 5.4, 8.3_

  - [ ] 8.2 Add loading states and skeletons

    - Create loading skeleton components for lists
    - Add loading spinners for form submissions
    - Implement loading states for all async operations
    - Add proper loading indicators for file uploads
    - _Requirements: 8.3_

  - [ ] 8.3 Create confirmation dialogs
    - Build reusable confirmation dialog component
    - Add confirmation dialogs for all delete operations
    - Implement confirmation for status changes
    - Add proper dialog accessibility and keyboard navigation
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 9. Add responsive design and mobile optimization

  - [ ] 9.1 Implement responsive sidebar

    - Make sidebar collapsible on mobile devices
    - Add mobile navigation overlay
    - Implement touch gestures for sidebar control
    - Ensure proper responsive breakpoints
    - _Requirements: 8.1_

  - [ ] 9.2 Optimize forms for mobile
    - Make all forms responsive and touch-friendly
    - Add proper input sizing for mobile devices
    - Implement mobile-friendly file upload interface
    - Add mobile-optimized rich text editor
    - _Requirements: 8.1, 8.2_

- [ ] 10. Testing and quality assurance

  - [ ] 10.1 Write unit tests for components

    - Create tests for all form components
    - Add tests for authentication flows
    - Test CRUD operations and server actions
    - Add tests for file upload functionality
    - _Requirements: All requirements_

  - [ ] 10.2 Perform integration testing
    - Test complete authentication workflow
    - Test end-to-end CRUD operations for projects and blog posts
    - Test responsive design across devices
    - Verify accessibility compliance
    - _Requirements: All requirements_
