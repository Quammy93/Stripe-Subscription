//  it ensures that only one instance of PrismaClient is created and reused across the application,

// Import PrismaClient from the Prisma client library
import { PrismaClient } from "@prisma/client";

// Function to create a new instance of PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Extend the globalThis object to include a prismaGlobal property
declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Create or reuse the PrismaClient instance
// If prismaGlobal is already defined, use it; otherwise, create a new instance
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Export the PrismaClient instance for use in other parts of the application
export default prisma;

// In development mode, store the PrismaClient instance in prismaGlobal
// This ensures that hot-reloading in development doesn't create multiple instances
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
