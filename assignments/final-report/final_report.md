# **Wedora** – A Wedding Planning Web Application

Made by Ivan Banović and Krešimir Đikić, 25.2.2026.

## 1. Introduction

**Wedora** is a web application designed to simplify the process of planning and organizing a wedding. It provides couples with a centralized platform where they can manage key aspects of their event, keep track of important details, and stay organized throughout the entire planning journey.

The main goal of Wedora is to enable an intuitive overview of wedding preparation — from guest management and budgeting to exploring services and gathering inspiration. In addition to organizational tools, the platform is envisioned as a space for sharing ideas, tips, and experiences related to weddings, helping users make informed decisions and feel supported during the planning process.

A key long-term objective of the application is to allow professionals from the wedding industry (vendors) to present their services, showcase their work, and connect with couples. While this vendor functionality is part of the overall vision, the vendor dashboard and provider role management are planned for a future version of the application and are not included in the current release.

This report provides an overview of Wedora’s design, core functionality, and technical implementation, highlighting how the application supports users in organizing one of the most important events of their lives.

## 2. Project Phases

### Understanding Users and Their Tasks

To design Wedora effectively, we first analyzed the needs of our primary target group – couples planning their wedding. Wedding planning is a complex and emotionally significant process that involves researching services, comparing options, organizing ideas, and keeping track of important decisions.

We created personas representing different types of users. These personas helped us better understand user motivations, frustrations, and expectations, allowing us to prioritize clarity, simplicity, and ease of navigation in the interface.

👉 _Detailed personas and user needs are documented here:_ [**Assignment 2**](https://github.com/kdjiki/Wedding-planer/blob/main/assignments/assigment2/2nd_assigment.md)

### Core Sections and Functionalities

During development, we focused on implementing the core features that support exploration and organization.

The **Home Page** acts as the central hub of the application. From there, users can navigate to all key sections of the platform in a clear and intuitive way.

1. **Wedding Services**
   Users can:
   - Browse available wedding services.
   - Perform simple search and filtering to quickly find relevant vendors.
   - Open a service page to view detailed information, including description of the service, location and availability (occupied dates)
   - Logged-in users can add services to their favorites list.

2. **Inspiration**
   - All users (including non-authenticated visitors) can read blog posts divided into Ideas and Guides, tips and trends related to wedding planning, ideas, and advice.
   - Authenticated users can create and publish blog posts, contributing to the community and sharing experiences or inspiration.

3. **My Account**
   - Just for logged-in users.
   - Access and review their favorites list.
   - Personal data.

4. **User Authentication**
   - Provides a link for login and registration
   - Enable personalized access to features.

This structure ensures a _logical_ and _user-friendly_ flow:

- Visitors can explore services and read blog content without creating an account.
- Once they decide to organize their choices or contribute content, they can log in.
- Authenticated users gain additional functionality (favorites and blog posting), enhancing personalization and engagement.

### Prototypes

In this phase, we developed a **high-fidelity** prototype of the Wedora platform, focusing on the home page and core service browsing experience. The prototype presents key features such as service search and filtering, service views, blog access, and favorites management for authenticated users.

The main goal was to create a clean and intuitive interface that allows users to easily explore services, save their preferences, and engage with wedding-related content.

The desktop and mobile prototypes are available in [**Assignment 4**](https://github.com/kdjiki/Wedding-planer/blob/main/assignments/assigment4/4th_assigment.md)

## Implementation and Key Features

In this phase, we transformed the prototypes into a fully functional web application using **Next.js** and **React** for the frontend, **Supabase** for authentication and backend services, and Drizzle as the ORM for database management. In addition, a **headless CMS** was integrated to enable structured creation and management of blog content independently from the core application logic.

The main features currently implemented include:

1. **Service Search and Filtering** – Users can browse, search, and filter wedding services to quickly find relevant options.
2. **Service Details View** – Each service page displays a description, location, and availability information.
3. **Favorites Management** – Authenticated users can add services to favorites and access their saved list.
4. **Blog System** – All users can read blog posts, while authenticated users can create and publish new posts via the headless CMS.
5. **User Authentication** – Secure registration and login handled through Supabase.

This implementation ensures a clear separation between core application data (managed via Supabase and Drizzle) and content management (handled through the CMS), resulting in a scalable and maintainable architecture.

# Application Performance

This section shows the app’s performance **on desktop and mobile devices**, with **reports generated using PageSpeed Insights** to highlight responsiveness and usability across platforms.

# Conclusion

**Wedora** is a user-centered platform designed to simplify wedding planning by combining service exploration, content sharing, and personalized organization in one place. Through iterative design, persona development, prototyping, and implementation using **Next.js, React, Supabase, Drizzle, and a headless CMS,** the project evolved into a functional and scalable web application.

The integration of secure authentication, structured database management, and flexible content handling ensures both technical robustness and maintainability. Clear navigation, focused information architecture, and responsive design contribute to an intuitive and accessible user experience.

izvjestaji

## Future Improvements

In future versions, the platform will be expanded with:

- Booking functionality for services directly through the application.
- Budget tracking tools to help users manage wedding expenses.
- Guest list management and personal planning notes.
- Vendor dashboard and provider role support, enabling service owners to manage and present their offerings.

These enhancements aim to transform Wedora from a service discovery platform into a comprehensive wedding planning ecosystem.

# Team Contributions

**Ivan Banović:**
Responsible for the _My Account_ section and the _Inspiration (Blog)_ feature. Implemented blog display functionality, integrated the **headless CMS** for creating new blog posts, and connected this part of the system with **Supabase** to ensure proper data handling and content management.

**Krešimir Dikić:**
Responsible for the implementation of the _Home Page_ and _Wedding Services_ section, including service search and filtering. Implemented login and *registration functionalit*y and handled integration with **Supabase and Drizzle** for authentication and database management. Also developed the favorites system, enabling authenticated users to save and manage preferred services.
