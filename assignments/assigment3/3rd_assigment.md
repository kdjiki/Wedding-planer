# Next.js - Deploying Application

## 📝 Project Description

In this assignment, we successfully developed a functional web application using **Next.js**, based on the sitemap created in the previous task.  
All required objectives have been completed:

✅ Set up a new Next.js project.  
✅ Created template pages corresponding to the sitemap categories.  
✅ Defined routes for each page, ensuring proper navigation structure.  
✅ Implemented navigation between pages using the **Next.js Link** component for smooth transitions.  
✅ Deployed the application publicly to **Vercel** for testing and access.

---

## 🌐 Deployment

The project is publicly available at:  
👉 **[https://wedding-planer-one.vercel.app/](https://wedding-planer-one.vercel.app/)**

---

## ⚙️ Technical Overview

- **Framework:** [Next.js 14+](https://nextjs.org/)
- **Language:** TypeScript
- **Hosting:** [Vercel](https://vercel.com/)
- **Navigation:** Implemented with `Link` and `usePathname` from `next/navigation`
- **Routing:** File-based routing using the `app/` directory structure

---

## 📁 Project Structure

```plaintext
app/
 ├─ _components/
 │   └─navigation.tsx              # Main navigation component
 │
 ├─ inspiration/
 │   ├─ guides-tips-trends/         # Subpage for guides and trends
 │   └─ ideas/                      # Subpage for inspiration ideas
 │
 ├─ login/
 │
 ├─ my-account/
 │   ├─ budget-planner/             # Budget management section
 │   ├─ my-bookings/                # Booked services overview
 │   ├─ notes/                      # Notes and checklists
 │   └─ profile/                    # User profile section
 │
 ├─ vendor-dashboard/
 │   ├─ calendar/                   # Vendor calendar
 │   ├─ manage-services/            # Service management
 │   └─ reviews/                    # Client reviews
 │
 ├─ wedding-service/
 │   ├─ bands-djs/                  # Music and entertainment
 │   ├─ catering/                   # Catering options
 │   ├─ other-services/             # Miscellaneous services
 │   ├─ photographers/              # Photography services
 │   └─ wedding-halls/              # Wedding venues
 │
 ├─ favicon.ico
 |─navigationData.ts                # Page definitions and route data
 ├─ globals.css                     # Global styling
 ├─ layout.tsx                      # Root layout for the app
 ├─ not-found.tsx                   # Custom 404 page
 └─ page.tsx                        # Home page

```
