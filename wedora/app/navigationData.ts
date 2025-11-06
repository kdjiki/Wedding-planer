
export type Page = {
    title: string;
    path: `/${string}`;
};


const mainPages: Page[] = [
  { title: "Home", path: "/" },
  {
    title: "Wedding service",
    path: "/wedding-service",
  },
  {
    title: "My account",
    path: "/my-account",
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
        title: "Profile", 
        path: "/my-account/profile" 
    },    
    { 
        title: "My bookings", 
        path: "/my-account/my-bookings" 
    },
    { 
        title: "Budget Planner", 
        path: "/my-account/budget-planner"
    },
    { 
        title: "Notes", 
        path: "/my-account/notes" 
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

export { mainPages, weddingServicePages, myAccountPages, vendorPages, inspirationPages };