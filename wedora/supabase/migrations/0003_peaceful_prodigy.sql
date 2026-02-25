CREATE TABLE "guide_articles" (
	"id" text PRIMARY KEY NOT NULL,
	"tag" text NOT NULL,
	"category" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"read_time" integer NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "real_wedding_stories" (
	"id" text PRIMARY KEY NOT NULL,
	"tag" text NOT NULL,
	"couple" text NOT NULL,
	"location" text NOT NULL,
	"date" timestamp NOT NULL,
	"guests" integer NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wedding_ideas" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"category" text NOT NULL
);
