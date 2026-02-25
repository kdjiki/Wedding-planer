
export type Page = {
    title: string;
    path: `/${string}`;
};


const mainPages: Page[] = [
  { 
    title: "Home",
    path: "/" },
  {
    title: "Wedding service",
    path: "/wedding-service",
  },
  {
    title: "Vendor dashboard",
    path: "/vendor-dashboard",
  },
  {
    title: "Inspiration",
    path: "/inspiration",
  },
{
    title: "My account",
    path: "/my-account",
  },
  {
    title: "Login",
    path: "/login",
  },
];


const weddingServicePages: Page[] = [
    {
        title: "Wedding halls", 
        path: "/wedding-service/wedding-halls" 
    },    
    { 
        title: "Photographers", 
        path: "/wedding-service/photographers" 
    },
    { 
        title: "Bands/DJs", 
        path: "/wedding-service/bands-djs"
    },
    { 
        title: "Catering", 
        path: "/wedding-service/catering" 
    },
    { 
        title: "Other services", 
        path: "/wedding-service/other-services" 
    },
    
];

const myAccountPages: Page[] = [
    { 
        title: "Profile Info", 
        path: "/my-account/profile" 
    },    
    { 
        title: "My Favorites", 
        path: "/my-account/my-favorites" 
    },
];

const vendorPages: Page[] = [
    { 
        title: "Add/Menage services", 
        path: "/vendor-dashboard/manage-services" 
    },
    { 
        title: "Calendar", 
        path: "/vendor-dashboard/calendar" 
    },
    { 
        title: "Client reviews", 
        path: "/vendor-dashboard/reviews" 
    },
];
const inspirationPages: Page[] = [
    { 
        title: "Ideas", 
        path: "/inspiration/ideas" 
    },    
    { 
        title: "Guides, tips & trends", 
        path: "/inspiration/guides-tips-trends" 
    },
];

const quickLinks : Page[] =
 [
    { 
        title: "Browse Services", 
        path: "/" 
    },
    { 
        title: "How It Works", 
        path: "/#how-it-works" 
    },
    { 
        title: "Pricing", 
        path: "/my-account/budget-planner" 
    },
    { 
        title: "Blog", 
        path: "/inspiration" 
    }
];

const support :Page[] = 
[
    { 
        title: "Help Center", 
        path: "/support/help-center" 
    },
    { 
        title: "Contact Us", 
        path: "/support/contact-us" 
    },
    { 
        title: "FAQs", 
        path: "/support/faqs" 
    },
    { 
        title: "Terms & Privacy", 
        path: "/support/terms-privacy" 
    }
];



export { mainPages, weddingServicePages, myAccountPages, vendorPages, inspirationPages, quickLinks, support };