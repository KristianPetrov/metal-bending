import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quoteRequests = sqliteTable(
  "quote_requests",
  {
    id: text("id").primaryKey(),
    createdAt: text("created_at").notNull(),
    status: text("status").notNull().default("new"),
    company: text("company").notNull(),
    contactName: text("contact_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    projectType: text("project_type").notNull(),
    material: text("material"),
    profile: text("profile"),
    quantity: integer("quantity"),
    radius: text("radius"),
    timeline: text("timeline"),
    notes: text("notes"),
    fileKey: text("file_key"),
    fileName: text("file_name"),
    fileType: text("file_type"),
    fileSize: integer("file_size"),
  },
  (table) => [index("quote_requests_created_at_idx").on(table.createdAt)],
);
