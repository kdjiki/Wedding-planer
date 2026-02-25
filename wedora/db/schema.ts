import {
  pgTable,
  text,
  varchar,
  integer,
  real,
  boolean,
  timestamp,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

//
// USERS
//
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

//
// SERVICE LISTINGS
//
export const serviceListings = pgTable("service_listings", {
  id: uuid("id").defaultRandom().primaryKey(),

  image: text("image").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  rating: real("rating").notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  priceRange: varchar("price_range", { length: 100 }).notNull(),
  description: text("description").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const serviceTags = pgTable("service_tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => serviceListings.id, { onDelete: "cascade" }),
  tag: varchar("tag", { length: 100 }).notNull(),
})

//
// BOOKINGS (insted of dateBooked: Date[])
// 
//
export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),

  serviceId: uuid("service_id")
    .notNull()
    .references(() => serviceListings.id, { onDelete: "cascade" }),

  bookedDate: timestamp("booked_date", { withTimezone: false }).notNull(),
})

//
// FAVORITES (many-to-many user ↔ service)
//
export const favorites = pgTable(
  "favorites",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    serviceId: uuid("service_id")
      .notNull()
      .references(() => serviceListings.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.serviceId],
    }),
  })
)


/* WEDDING IDEAS */

/* export const weddingIdeas = pgTable("wedding_ideas", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
})
*/
/*GUIDE ARTICLES  */
/*
export const guideArticles = pgTable("guide_articles", {
  id: text("id").primaryKey(),
  tag: text("tag").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  readTime: integer("read_time").notNull(),
  image: text("image").notNull(),
})
*/
/* REAL WEDDING STORIES */
/*
export const realWeddingStories = pgTable("real_wedding_stories", {
  id: text("id").primaryKey(),
  tag: text("tag").notNull(),
  couple: text("couple").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  guests: integer("guests").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
})
*/
export const servicesRelations = relations(serviceListings, ({ many }) => ({
  bookings: many(bookings),
  favorites: many(favorites),
}))

export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
}))

export const bookingsRelations = relations(bookings, ({ one }) => ({
  service: one(serviceListings, {
    fields: [bookings.serviceId],
    references: [serviceListings.id],
  }),
}))

export const serviceTagsRelations = relations(serviceTags, ({ one }) => ({
  service: one(serviceListings, {
    fields: [serviceTags.listingId],
    references: [serviceListings.id],
  }),
}))

//
// WEDDING IDEAS
//
export const weddingIdeas = pgTable("wedding_ideas", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
})

//
// GUIDE ARTICLES
//
export const guideArticles = pgTable("guide_articles", {
  id: text("id").primaryKey(),
  tag: text("tag").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  readTime: integer("read_time").notNull(),
  image: text("image").notNull(),
})

//
// REAL WEDDING STORIES
//
export const realWeddingStories = pgTable("real_wedding_stories", {
  id: text("id").primaryKey(),
  tag: text("tag").notNull(),
  couple: text("couple").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  guests: integer("guests").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
})
