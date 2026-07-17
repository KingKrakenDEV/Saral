import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const legalDocumentsTable = pgTable("legal_documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  documentType: text("document_type").notNull(),
  content: text("content").notNull(),
  fields: text("fields").notNull().default("{}"), // JSON-encoded field values
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLegalDocumentSchema = createInsertSchema(legalDocumentsTable).omit({ id: true, createdAt: true });
export type InsertLegalDocument = z.infer<typeof insertLegalDocumentSchema>;
export type LegalDocument = typeof legalDocumentsTable.$inferSelect;
