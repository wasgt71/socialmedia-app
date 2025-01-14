// deleteUsers.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteUsers() {
  try {
    await prisma.userinfo.deleteMany({});
    console.log('All users have been deleted.');
  } catch (error) {
    console.error('Error deleting users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUsers();