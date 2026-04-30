import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    console.log("Start seeding...")

    const sweet = await prisma.ciderClass.upsert({
        where: { name: 'Sweet' },
        update: {},
        create: {
            name: 'Sweet',
            description: 'The foundation of modern cider. These apples provide high juice yields and a clean, fermentable sugar base. Lacking significant bitterness or acidity, they produce a light, approachable cider that is often used to provide volume and sweetness to a blend.',
            chemistry: 'Low Acid (< 0.45%), Low Tannin (< 0.1%)'
        }
    })

    const sharp = await prisma.ciderClass.upsert({
        where: { name: 'Sharp' },
        update: {},
        create: {
            name: 'Sharp',
            description: 'The source of brightness and \'zip.\' High malic acid levels provide a zesty, refreshing bite and play a critical role in food safety by lowering the pH of the must. Sharps are essential for balancing the heavy body of heritage bittersweet varieties.',
            chemistry: 'High Acid (> 0.45%), Low Tannin (< 0.1%)'
        }
    })

    const bittersweet = await prisma.ciderClass.upsert({
        where: { name: 'Bittersweet' },
        update: {},
        create: {
            name: 'Bittersweet',
            description: 'The backbone of traditional European ciders. These apples are low in acid but packed with polyphenols and tannins that provide mouthfeel, \'body,\' and complex leathery or smoky notes. They are rarely eaten fresh due to their astringent, drying effect on the palate.',
            chemistry: 'Low Acid (< 0.45%), High Tannin (> 0.1%)'
        }
    })

    const bittersharp = await prisma.ciderClass.upsert({
        where: { name: 'Bittersharp' },
        update: {},
        create: {
            name: 'Bittersharp',
            description: 'The \'unicorns\' of the cider orchard. These rare cultivars possess both intense acidity and a powerful tannic structure. Because they contain all the necessary components for a balanced drink, they are often used to create prestigious single-varietal vintage ciders.',
            chemistry: `High Acid (> 0.45%), High Tannin (> 0.1%)`
        }
    })
    const apples = [
        {
            name: 'Honeycrisp',
            species: 'domestica',
            origin: 'Excelsior, Minnesota',
            category: 'CULINARY' as const,
            brix: 14.5,
            ph: 3.5,
            tannin: 0.05,
            imageUrl: '/images/cultivars/Culinary_Honeycrisp.jpg',
            classId: sweet.id,
        },
    ]

    for (const apple of apples) {
        await prisma.cultivar.upsert({
            where: { name: apple.name },
            update: {},
            create: apple,
        })
    }
    console.log("Seeding finished.")
}




main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })