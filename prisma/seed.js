const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function patients() {
    const createMany = await prisma.patients.createMany({
        data: [
            {
                surname: "Петров",
                name: "Иван"
            },
        ],
        skipDuplicates: true
    }
    );
}

async function statistics() {
    const createMany = await prisma.statistics.createMany({
        data: [
            {
                pulse: 87,
                time: new Date(2023,10,10,12,0,20),
                patient_id: 1
            },
            {
                pulse: 90,
                time: new Date(2023,10,10,12,5,20),
                patient_id: 1
            },
        ],
        skipDuplicates: true
    }
    );
}


patients()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })

statistics()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })