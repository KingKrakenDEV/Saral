import { Router, type IRouter } from "express";
import { eq, count } from "drizzle-orm";
import { db, conversationsTable, messagesTable, legalDocumentsTable } from "@workspace/db";
import {
  ExplainDocumentBody,
  CreateDocumentBody,
  GetDocumentParams,
  DeleteDocumentParams,
} from "@workspace/api-zod";
import OpenAI from "openai";

const router: IRouter = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const DOCUMENT_TYPES = [
  {
    id: "affidavit",
    name: "Affidavit",
    description: "A sworn written statement used as evidence in court or for official purposes",
    fields: [
      { name: "deponentName", label: "Your Full Name", type: "text", required: true, placeholder: "e.g. Ramesh Kumar Sharma" },
      { name: "deponentAge", label: "Your Age", type: "text", required: true, placeholder: "e.g. 35" },
      { name: "deponentAddress", label: "Your Address", type: "textarea", required: true, placeholder: "Full residential address" },
      { name: "purpose", label: "Purpose of Affidavit", type: "text", required: true, placeholder: "e.g. Name correction in Aadhaar card" },
      { name: "statement", label: "Statement / Facts", type: "textarea", required: true, placeholder: "Describe the facts you are swearing to..." },
      { name: "date", label: "Date", type: "text", required: true, placeholder: "e.g. 17th July 2026" },
      { name: "place", label: "Place", type: "text", required: true, placeholder: "e.g. New Delhi" },
    ],
  },
  {
    id: "legal_notice",
    name: "Legal Notice",
    description: "A formal written communication demanding action before legal proceedings",
    fields: [
      { name: "senderName", label: "Your Name", type: "text", required: true, placeholder: "e.g. Priya Verma" },
      { name: "senderAddress", label: "Your Address", type: "textarea", required: true, placeholder: "Your full address" },
      { name: "recipientName", label: "Recipient's Name", type: "text", required: true, placeholder: "Name of person/company" },
      { name: "recipientAddress", label: "Recipient's Address", type: "textarea", required: true, placeholder: "Their full address" },
      { name: "subject", label: "Subject of Notice", type: "text", required: true, placeholder: "e.g. Recovery of security deposit" },
      { name: "facts", label: "Facts & Grievance", type: "textarea", required: true, placeholder: "Describe what happened and your grievance..." },
      { name: "demand", label: "Your Demand", type: "textarea", required: true, placeholder: "What do you want them to do?" },
      { name: "deadline", label: "Response Deadline (days)", type: "text", required: true, placeholder: "e.g. 15" },
      { name: "date", label: "Date of Notice", type: "text", required: true, placeholder: "e.g. 17th July 2026" },
    ],
  },
  {
    id: "rent_agreement",
    name: "Rent Agreement",
    description: "A lease agreement between landlord and tenant for residential or commercial property",
    fields: [
      { name: "landlordName", label: "Landlord's Name", type: "text", required: true, placeholder: "e.g. Suresh Patel" },
      { name: "landlordAddress", label: "Landlord's Address", type: "textarea", required: true, placeholder: "Landlord's permanent address" },
      { name: "tenantName", label: "Tenant's Name", type: "text", required: true, placeholder: "e.g. Amit Singh" },
      { name: "tenantAddress", label: "Tenant's Permanent Address", type: "textarea", required: true, placeholder: "Tenant's permanent address" },
      { name: "propertyAddress", label: "Property Address", type: "textarea", required: true, placeholder: "Full address of the rented property" },
      { name: "monthlyRent", label: "Monthly Rent (₹)", type: "text", required: true, placeholder: "e.g. 15000" },
      { name: "securityDeposit", label: "Security Deposit (₹)", type: "text", required: true, placeholder: "e.g. 45000" },
      { name: "startDate", label: "Start Date", type: "text", required: true, placeholder: "e.g. 1st August 2026" },
      { name: "duration", label: "Duration (months)", type: "text", required: true, placeholder: "e.g. 11" },
    ],
  },
  {
    id: "consumer_complaint",
    name: "Consumer Complaint",
    description: "A formal complaint to the Consumer Forum against defective products or deficient services",
    fields: [
      { name: "complainantName", label: "Your Name", type: "text", required: true, placeholder: "e.g. Meena Gupta" },
      { name: "complainantAddress", label: "Your Address", type: "textarea", required: true, placeholder: "Your full address" },
      { name: "oppositePartyName", label: "Company / Seller Name", type: "text", required: true, placeholder: "e.g. XYZ Electronics Pvt. Ltd." },
      { name: "oppositePartyAddress", label: "Company Address", type: "textarea", required: true, placeholder: "Company's registered address" },
      { name: "product", label: "Product / Service", type: "text", required: true, placeholder: "e.g. Samsung TV Model ABC" },
      { name: "purchaseDate", label: "Purchase Date", type: "text", required: true, placeholder: "e.g. 5th March 2026" },
      { name: "amount", label: "Amount Paid (₹)", type: "text", required: true, placeholder: "e.g. 45000" },
      { name: "grievance", label: "Grievance / Defect", type: "textarea", required: true, placeholder: "Describe the problem with the product/service..." },
      { name: "relief", label: "Relief Sought", type: "textarea", required: true, placeholder: "What remedy do you want? e.g. Refund, replacement, compensation..." },
    ],
  },
  {
    id: "noc",
    name: "No Objection Certificate (NOC)",
    description: "A certificate stating no objection to a particular action or transaction",
    fields: [
      { name: "issuerName", label: "Issuer's Name", type: "text", required: true, placeholder: "Name of person/org issuing NOC" },
      { name: "issuerDesignation", label: "Issuer's Designation (if any)", type: "text", required: false, placeholder: "e.g. Owner, Manager" },
      { name: "issuerAddress", label: "Issuer's Address", type: "textarea", required: true, placeholder: "Issuer's address" },
      { name: "recipientName", label: "Recipient's Name", type: "text", required: true, placeholder: "Who is the NOC for?" },
      { name: "purpose", label: "Purpose of NOC", type: "text", required: true, placeholder: "e.g. Bike transfer, tenant verification, passport" },
      { name: "details", label: "Relevant Details", type: "textarea", required: true, placeholder: "Any specific details, vehicle number, property address, etc." },
      { name: "date", label: "Date", type: "text", required: true, placeholder: "e.g. 17th July 2026" },
    ],
  },
  {
    id: "power_of_attorney",
    name: "Power of Attorney",
    description: "Authorize someone to act on your behalf for legal or financial matters",
    fields: [
      { name: "principalName", label: "Your Name (Principal)", type: "text", required: true, placeholder: "e.g. Vikram Nair" },
      { name: "principalAddress", label: "Your Address", type: "textarea", required: true, placeholder: "Your full address" },
      { name: "agentName", label: "Agent's Name", type: "text", required: true, placeholder: "Person you are authorizing" },
      { name: "agentAddress", label: "Agent's Address", type: "textarea", required: true, placeholder: "Agent's full address" },
      { name: "relationship", label: "Your Relationship to Agent", type: "text", required: false, placeholder: "e.g. Son, Friend, Colleague" },
      { name: "powers", label: "Powers Granted", type: "textarea", required: true, placeholder: "List the specific powers/actions the agent is authorized to perform..." },
      { name: "duration", label: "Duration / Validity", type: "text", required: false, placeholder: "e.g. Until revoked, or specific date" },
      { name: "date", label: "Date", type: "text", required: true, placeholder: "e.g. 17th July 2026" },
    ],
  },
];

router.get("/legal/document-types", async (_req, res): Promise<void> => {
  res.json(DOCUMENT_TYPES);
});

router.post("/legal/explain", async (req, res): Promise<void> => {
  const parsed = ExplainDocumentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const language = parsed.data.language ?? "en";
  const langInstruction = language !== "en"
    ? `Please respond in ${language === "hi" ? "Hindi" : language === "ta" ? "Tamil" : language === "bn" ? "Bengali" : language === "te" ? "Telugu" : language === "mr" ? "Marathi" : "English"}.`
    : "Respond in English.";

  const systemPrompt = `You are NyayAI, an expert Indian legal assistant. Your task is to explain legal documents in simple language that any ordinary Indian citizen can understand. ${langInstruction}

When explaining a document:
1. Start with a brief summary: "This document is about..." (1-2 sentences)
2. Explain what type of document it is
3. Break down the key terms and clauses in simple language
4. Highlight any important rights or obligations of the parties
5. Point out anything unusual, concerning, or that the person should pay attention to
6. Mention if they should consult a lawyer before signing/acting on it
7. Use simple language, avoid legal jargon — if you must use a legal term, explain it immediately`;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 2048,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Please explain this legal document:\n\n${parsed.data.text}` },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

router.get("/legal/documents", async (_req, res): Promise<void> => {
  const documents = await db
    .select()
    .from(legalDocumentsTable)
    .orderBy(legalDocumentsTable.createdAt);
  res.json(documents);
});

router.post("/legal/documents", async (req, res): Promise<void> => {
  const parsed = CreateDocumentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const docType = DOCUMENT_TYPES.find((dt) => dt.id === parsed.data.documentType);
  if (!docType) {
    res.status(400).json({ error: "Invalid document type" });
    return;
  }

  const fieldsText = Object.entries(parsed.data.fields as Record<string, string>)
    .map(([key, value]) => {
      const field = docType.fields.find((f) => f.name === key);
      return `${field?.label ?? key}: ${value}`;
    })
    .join("\n");

  const systemPrompt = `You are NyayAI, an expert Indian legal document drafter. Generate a complete, legally sound ${docType.name} based on the provided information. 

The document should:
1. Be formatted as a proper legal document with appropriate headings and structure
2. Follow Indian legal conventions and formatting standards
3. Include all standard clauses required for this type of document
4. Use formal legal language appropriate for India
5. Include placeholders like [SIGNATURE] and [WITNESS SIGNATURE] where appropriate
6. Be ready to use — the person should be able to print and use this document
7. End with appropriate signature/attestation sections

Generate ONLY the document text — no explanations or commentary before or after.`;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullContent = "";

  const stream = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 3000,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Generate a ${docType.name} with the following information:\n\n${fieldsText}`,
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullContent += content;
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  // Save the document to DB
  const [saved] = await db
    .insert(legalDocumentsTable)
    .values({
      title: parsed.data.title,
      documentType: parsed.data.documentType,
      content: fullContent,
      fields: JSON.stringify(parsed.data.fields),
    })
    .returning();

  res.write(`data: ${JSON.stringify({ done: true, documentId: saved.id })}\n\n`);
  res.end();
});

router.get("/legal/documents/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetDocumentParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [doc] = await db
    .select()
    .from(legalDocumentsTable)
    .where(eq(legalDocumentsTable.id, params.data.id));

  if (!doc) {
    res.status(404).json({ error: "Document not found" });
    return;
  }

  res.json(doc);
});

router.delete("/legal/documents/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteDocumentParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(legalDocumentsTable)
    .where(eq(legalDocumentsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Document not found" });
    return;
  }

  res.sendStatus(204);
});

router.get("/legal/stats", async (_req, res): Promise<void> => {
  const [convStats] = await db.select({ total: count() }).from(conversationsTable);
  const [msgStats] = await db.select({ total: count() }).from(messagesTable);
  const [docStats] = await db.select({ total: count() }).from(legalDocumentsTable);

  res.json({
    totalConversations: Number(convStats.total),
    totalMessages: Number(msgStats.total),
    totalDocuments: Number(docStats.total),
  });
});

export default router;
