import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 30; i++) {
    await prisma.tweet.create({
      data: {
        text: 'tweet created by seed',
        author: {
          connect: {
            id: '8ecd62fe-6233-4ba6-a4c5-95a17576faff',
          },
        },
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })

// "8ecd62fe-6233-4ba6-a4c5-95a17576faff"
// "117021340127220940452"
