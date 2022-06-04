import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){

    const test = await prisma.test.upsert({
        where: {id: 1},
        update:{},
        create:{
            name: "Teste",
            value: 1
        }
    })

    const userUser = await prisma.user.upsert({
        where: {id: 1},
        update: {},
        create:{
            email: "teste@seed.com",
            senha: "segredo",
            role: "ADMIN"   
        }
    })

    const toDo = await prisma.todo.upsert({
        where: {id: 1},
        update: {},
        create:{
            description: "Criar novos usuários comuns.",
            dayDeadline: 3,
            monthDeadline: 6,
            yearDeadline: 2022,
            userId: 1
        }
    })
}
main().catch((e) => {
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})