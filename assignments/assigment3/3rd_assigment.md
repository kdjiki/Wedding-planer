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
 ├─ layout.tsx                # Root layout (HTML and body structure)
 ├─ page.tsx                  # Home page
 |─navigationData.ts          # Page definitions and route data
 ├─ wedding-service/
 │   ├─ layout.tsx            # Secondary layout for this section
 │   └─ page.tsx
 ├─ my-account/
 │   ├─ layout.tsx
 │   └─ page.tsx
 ├─ vendor-dashboard/
 │   └─ page.tsx
 ├─ inspiration/
 │   └─ page.tsx
 └─ _components/
     └─navigation.tsx        # Navigation bar component

```
