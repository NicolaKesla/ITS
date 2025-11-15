// src/config/prisma.js - This USES the generated client
const { PrismaClient } = require('@prisma/client');
//                                   ↑
//                    Generated from prisma/schema.prisma
//                    Lives in node_modules/@prisma/client

const prisma = new PrismaClient();
module.exports = prisma;