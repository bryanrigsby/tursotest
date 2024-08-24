// // pages/api/users.js
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

//comment out for local db
const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})
//comment out for local db
const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

//comment out for Turso db
// const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    console.log('users', users)
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
