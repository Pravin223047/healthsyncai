import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function connectToDatabase(): Promise<PrismaClient> {
  try {
    await prisma.$connect();
    console.log("Connected to database");
    return prisma;
  } catch (error) {
    console.error("Error connecting to database", error);
    throw error;
  }
}
