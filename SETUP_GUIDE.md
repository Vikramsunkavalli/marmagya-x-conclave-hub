# Complete Setup Guide

This guide will help you set up the authentication system for your Marmagya X Conclave Hub application.

## 🚀 Quick Setup

### 1. Environment Variables

Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Database Setup

Run the migrations in order:

```bash
# Start Supabase (if not already running)
supabase start

# Apply migrations
supabase db reset

# This will run all migrations including the new auth system
```

### 3. Create Admin User

**Option A: Using the setup script (Recommended)**
```bash
# Install dotenv if not already installed
npm install dotenv

# Run the setup script
node setup-admin.js
```

**Option B: Manual setup through Supabase Dashboard**
1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add user"
4. Email: `admin@marmagya.com`
5. Password: `admin123`
6. Confirm email: Yes
7. Copy the user ID
8. Go to Table Editor > admin_users
9. Insert a new row with:
   - id: (paste the user ID from step 7)
   - email: `admin@marmagya.com`
   - name: `Admin User`
   - role: `admin`
   - is_active: `true`

### 4. Start the Application

```bash
npm run dev
```

## 🔐 Authentication System

### **How It Works:**

#### **Normal Users (Public)**
- ✅ **No authentication required**
- ✅ Can view all public pages (`/`, `/speakers`, `/gallery`, etc.)
- ✅ Can only **read** data, cannot modify anything
- ✅ No login required

#### **Admin Users (Authenticated)**
- ✅ **Must authenticate** to access admin features
- ✅ Login at `/admin/login`
- ✅ Can perform **full CRUD operations**
- ✅ Access protected admin routes (`/admin`, `/admin/speakers`, etc.)
- ✅ Sessions managed by Supabase Auth

### **Access Points:**
- **Public Site**: `http://localhost:5173`
- **Admin Login**: `http://localhost:5173/admin/login`
- **Admin Dashboard**: `http://localhost:5173/admin` (requires login)

### **Default Admin Credentials:**
- **Email**: `admin@marmagya.com`
- **Password**: `admin123`

## 🛠️ Technical Details

### **Database Structure:**
- `admin_users` - Stores admin user information (linked to auth.users)
- `speakers`, `events`, `sponsors`, `gallery` - Content tables with RLS policies

### **Security Features:**
- **Row Level Security (RLS)** policies on all tables
- **Supabase Auth** integration for session management
- **Protected routes** that redirect to login
- **Admin-only access** for all write operations
- **Public read access** for all content

### **Authentication Flow:**
1. Admin visits `/admin/login`
2. Enters credentials
3. Supabase Auth validates credentials
4. System checks if user exists in `admin_users` table
5. If valid admin, grants access to admin dashboard
6. All admin operations require valid Supabase session

## 🔧 Troubleshooting

### **Common Issues:**

1. **"Access denied" error on login**
   - Make sure the user exists in both `auth.users` and `admin_users` tables
   - Check that `is_active` is `true` in `admin_users`

2. **Database operations fail**
   - Ensure RLS policies are properly set up
   - Check that user is authenticated and is an admin

3. **Migration errors**
   - Run `supabase db reset` to start fresh
   - Check that all migration files are in the correct order

4. **Environment variables not loading**
   - Make sure `.env` file is in the project root
   - Restart the development server after adding variables

### **Reset Everything:**
```bash
# Reset database
supabase db reset

# Recreate admin user
node setup-admin.js

# Restart application
npm run dev
```

## 📝 File Structure

```
src/
├── contexts/
│   └── SimpleAuthContext.tsx    # Authentication context
├── components/
│   └── ProtectedRoute.tsx       # Route protection
├── pages/
│   ├── AdminLogin.tsx           # Login page
│   ├── Admin.tsx                # Admin dashboard
│   └── AdminSpeakers.tsx        # Admin speakers management
└── integrations/supabase/
    ├── client.ts                # Supabase client
    └── types.ts                 # TypeScript types

supabase/migrations/
├── 001_create_speakers_table.sql
├── 002_setup_storage.sql
├── 003_insert_sample_data.sql
└── 005_simplified_auth.sql      # New auth system
```

## 🎯 Next Steps

1. **Change default password** in production
2. **Add more admin users** through the Supabase dashboard
3. **Customize admin interface** as needed
4. **Set up proper CORS** for production
5. **Configure email templates** for user management

The authentication system is now fully functional and separates normal users (read-only) from admin users (full access) as requested!
