import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const shops = pgTable("shops", {
  id: serial("id").primaryKey(),
  ownerAccountId: text("owner_account_id").notNull(),
  name: text("name"),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  trialStartedAt: timestamp("trial_started_at", { withTimezone: true }),
  trialEndsAt: timestamp("trial_ends_at", { withTimezone: true }),
  automatedWhatsappMessagesSent: integer("automated_whatsapp_messages_sent")
    .notNull()
    .default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const shopMemberships = pgTable(
  "shop_memberships",
  {
    id: serial("id").primaryKey(),
    shopId: integer("shop_id")
      .notNull()
      .references(() => shops.id, { onDelete: "cascade" }),
    accountId: text("account_id").notNull(),
    role: text("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("shop_memberships_shop_account_unique").on(
      table.shopId,
      table.accountId,
    ),
  ],
);

export const outlets = pgTable(
  "outlets",
  {
    id: serial("id").primaryKey(),
    shopId: integer("shop_id")
      .notNull()
      .references(() => shops.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    address: text("address"),
    isHq: boolean("is_hq").notNull().default(false),
    isOperational: boolean("is_operational").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("outlets_one_hq_per_shop")
      .on(table.shopId)
      .where(sql`${table.isHq} = true`),
  ],
);
