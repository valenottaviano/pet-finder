import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  // En desarrollo, agregamos parámetros para evitar conflictos de prepared statements
  const isDev = process.env.NODE_ENV !== "production";
  let databaseUrl = process.env.DATABASE_URL;

  if (isDev && databaseUrl) {
    // Agregar parámetros para evitar prepared statement conflicts
    const separator = databaseUrl.includes("?") ? "&" : "?";
    databaseUrl = `${databaseUrl}${separator}prepared_statements=false&pgbouncer=true&connection_limit=1`;
  }

  const prisma = new PrismaClient({
    log: isDev ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  return prisma;
};

// En desarrollo, crear una nueva instancia para cada uso para evitar conflictos
let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = createPrismaClient();
} else {
  // En desarrollo, usar el patrón singleton pero con limpieza forzada
  if (!globalThis.prisma) {
    globalThis.prisma = createPrismaClient();
  }
  db = globalThis.prisma;
}

export { db };
