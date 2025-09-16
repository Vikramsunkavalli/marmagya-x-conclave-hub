# Authentication System

This application now has a proper authentication system that separates normal users from admin users.

## 🔐 Authentication Overview

### **Normal Users (Public)**
- **No authentication required**
- Can only **view/read** data
- Access public pages: `/`, `/speakers`, `/gallery`, etc.
- Cannot perform any CRUD operations

### **Admin Users (Authenticated)**
- **Must authenticate** to access admin features
- Can perform **full CRUD operations** (Create, Read, Update, Delete)
- Access admin pages: `/admin`, `/admin/speakers`, `/admin/events`, etc.
- Protected by authentication guards

## 🚀 Setup Instructions

### 1. Run Database Migration
```bash
node run-migration.js
```

Or manually:
```bash
supabase start
supabase db reset
```

### 2. Default Admin Credentials
- **Email**: `admin@marmagya.com`
- **Password**: `admin123`

### 3. Access Points
- **Public Site**: `http://localhost:5173`
- **Admin Login**: `http://localhost:5173/admin/login`
- **Admin Dashboard**: `http://localhost:5173/admin` (requires login)

## 🏗️ Architecture

### Database Tables
- `admin_users` - Stores admin user accounts
- `admin_sessions` - Manages user sessions
- `speakers`, `events`, `sponsors`, `gallery` - Content tables with RLS policies

### Authentication Flow
1. Admin visits `/admin/login`
2. Enters credentials
3. System validates against `admin_users` table
4. Creates session token in `admin_sessions`
5. Redirects to admin dashboard
6. All admin operations require valid session

### Security Features
- **Row Level Security (RLS)** policies on all tables
- **Session-based authentication** with expiration
- **Protected routes** that redirect to login
- **Token validation** for all admin operations
- **Automatic session cleanup** for expired tokens

## 🔧 Technical Implementation

### Components
- `AuthContext` - Manages authentication state
- `ProtectedRoute` - Guards admin routes
- `AdminLogin` - Login form component
- Updated admin components with auth checks

### Database Policies
- **Public read access** for all content (no auth needed)
- **Admin write access** requires authentication
- **Session management** with automatic cleanup

## 🛡️ Security Notes

1. **Change default password** in production
2. **Use proper password hashing** (currently using simple hash for demo)
3. **Set up HTTPS** in production
4. **Configure proper CORS** settings
5. **Regular security audits** recommended

## 📝 Usage

### For Normal Users
- Visit any public page
- Browse speakers, events, gallery
- No login required

### For Admins
1. Go to `/admin/login`
2. Enter admin credentials
3. Access admin dashboard
4. Manage content (speakers, events, etc.)
5. Logout when done

## 🔄 Session Management

- Sessions expire after 24 hours
- Automatic cleanup of expired sessions
- Logout clears all session data
- Session validation on every admin operation

This system ensures that only authenticated admins can modify content while allowing public users to view everything without any authentication barriers.
