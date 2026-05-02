import { prisma } from "./prisma";

const main = async () => {
  console.log("Start seeding...");

  const sweet = await prisma.ciderFlavorClass.upsert({
    where: { name: "Sweet" },
    update: {},
    create: {
      name: "Sweet",
      description:
        "The foundation of modern cider. These apples provide high juice yields and a clean, fermentable sugar base. Lacking significant bitterness or acidity, they produce a light, approachable cider that is often used to provide volume and sweetness to a blend.",
      chemistry: "Low Acid (< 0.45%), Low Tannin (< 0.1%)",
    },
  });

  const sharp = await prisma.ciderFlavorClass.upsert({
    where: { name: "Sharp" },
    update: {},
    create: {
      name: "Sharp",
      description:
        "The source of brightness and 'zip.' High malic acid levels provide a zesty, refreshing bite and play a critical role in food safety by lowering the pH of the must. Sharps are essential for balancing the heavy body of heritage bittersweet varieties.",
      chemistry: "High Acid (> 0.45%), Low Tannin (< 0.1%)",
    },
  });

  const bittersweet = await prisma.ciderFlavorClass.upsert({
    where: { name: "Bittersweet" },
    update: {},
    create: {
      name: "Bittersweet",
      description:
        "The backbone of traditional European ciders. These apples are low in acid but packed with polyphenols and tannins that provide mouthfeel, 'body,' and complex leathery or smoky notes. They are rarely eaten fresh due to their astringent, drying effect on the palate.",
      chemistry: "Low Acid (< 0.45%), High Tannin (> 0.1%)",
    },
  });

  const bittersharp = await prisma.ciderFlavorClass.upsert({
    where: { name: "Bittersharp" },
    update: {},
    create: {
      name: "Bittersharp",
      description:
        "The 'unicorns' of the cider orchard. These rare cultivars possess both intense acidity and a powerful tannic structure. Because they contain all the necessary components for a balanced drink, they are often used to create prestigious single-varietal vintage ciders.",
      chemistry: `High Acid (> 0.45%), High Tannin (> 0.1%)`,
    },
  });
  const culinaryApples = [
    {
      name: "Honeycrisp",
      species: "domestica",
      origin: "Excelsior, Minnesota",
      category: "CULINARY" as const,
      brix: 14.5,
      ph: 3.5,
      tannin: 0.05,
      imageUrl: "/images/cultivars/culinary_Honeycrisp.jpg",
      description:
        "The quintessential modern culinary apple, famed for its exceptionally crisp, 'explosive' texture and honey-like sweetness. While low in tannins, its high juice yield and clean sugar profile make it a reliable base for approachable, light-bodied ciders. Its large cells provide a crispness that remains distinctive even in juice form.",
      flavorId: sweet.id,
    },
    {
      name: "Northern Spy",
      species: "domestica",
      origin: "East Bloomfield, New York",
      category: "CULINARY" as const,
      brix: 13.0,
      ph: 3.2,
      tannin: 0.08,
      imageUrl: "/images/cultivars/culinary_NorthernSpy.jpg",
      description:
        "An old New York favorite highly valued by cider makers for its 'sprightly' flavor and high vitamin C content. It provides a bright acidity and a clean, refreshing profile that helps sharpen up blends made from sweeter dessert fruit.",
      flavorId: sharp.id,
    },
    {
      name: "Winesap",
      species: "domestica",
      origin: "New Jersey, USA",
      category: "CULINARY" as const,
      brix: 13.0,
      ph: 3.2,
      tannin: 0.12,
      imageUrl: "/images/cultivars/culinary_Winesap.jpg",
      description:
        "An American heirloom prized for its spicy, wine-like flavor and high acidity. It is one of the few culinary apples with enough character and tannin to hold its own in a cider blend, providing a tart, punchy finish and great aromatic depth.",
      flavorId: sharp.id,
    },
    {
      name: "Empire",
      species: "domestica",
      origin: "Geneva, New York",
      category: "CULINARY" as const,
      brix: 12.5,
      ph: 3.4,
      tannin: 0.05,
      imageUrl: "/images/cultivars/culinary_Empire.jpg",
      description:
        "A cross between McIntosh and Red Delicious, Empire offers a classic 'bright' apple flavor. Its reliable sugar-to-acid ratio makes it a versatile blending component that prevents ciders from becoming too flat or syrupy.",
      flavorId: sharp.id,
    },
    {
      name: "Jonagold",
      species: "domestica",
      origin: "Geneva, New York",
      category: "CULINARY" as const,
      brix: 14.0,
      ph: 3.5,
      tannin: 0.06,
      imageUrl: "/images/cultivars/culinary_Jonagold.jpg",
      description:
        "A triploid cultivar that produces massive amounts of sweet, aromatic juice. Its honeyed notes and rich mouthfeel make it an excellent base for high-ABV ciders that require a smooth, rounded, and approachable finish.",
      flavorId: sweet.id,
    },
    {
      name: "Cortland",
      species: "domestica",
      origin: "Geneva, New York",
      category: "CULINARY" as const,
      brix: 12.5,
      ph: 3.4,
      tannin: 0.05,
      imageUrl: "/images/cultivars/culinary_Cortland.jpg",
      description:
        "A descendant of McIntosh, Cortland is famous for its snow-white flesh that resists browning. In cider, it contributes a bright, clean acidity and a very clear juice that helps maintain a light, attractive color in the final blend.",
      flavorId: sharp.id,
    },
    {
      name: "McIntosh",
      species: "domestica",
      origin: "Ontario, Canada",
      category: "CULINARY" as const,
      brix: 12.0,
      ph: 3.3,
      tannin: 0.06,
      imageUrl: "/images/cultivars/culinary_McIntosh.jpg",
      description:
        "A legendary North American apple with a distinctive 'vinous' or berry-like aroma. It provides a sharp, zesty profile to cider, though its soft flesh requires careful pressing to avoid excessive cloudiness.",
      flavorId: sharp.id,
    },
    {
      name: "Red Delicious",
      species: "domestica",
      origin: "Peru, Iowa",
      category: "CULINARY" as const,
      brix: 11.5,
      ph: 3.9,
      tannin: 0.04,
      imageUrl: "/images/cultivars/culinary_RedDelicious.jpg",
      description:
        "A world-famous variety known more for its iconic shape than its flavor depth. In cider making, it is primarily used as a 'filler' to provide juice volume and mild sweetness without significantly altering the acid or tannin profile.",
      flavorId: sweet.id,
    },
    {
      name: "Starkrimson",
      species: "domestica",
      origin: "Oregon, USA",
      category: "CULINARY" as const,
      brix: 12.0,
      ph: 3.8,
      tannin: 0.05,
      imageUrl: "/images/cultivars/culinary_Starkrimson.jpg",
      description:
        "A 'sport' of Red Delicious with a deep, solid red skin. It behaves similarly in cider, offering a mild, sub-acid juice that serves as an excellent neutral base for experimenting with yeast strains or adjuncts.",
      flavorId: sweet.id,
    },
    {
      name: "Golden Delicious",
      species: "domestica",
      origin: "Clay County, West Virginia",
      category: "CULINARY" as const,
      brix: 13.5,
      ph: 3.6,
      tannin: 0.05,
      imageUrl: "/images/cultivars/culinary_GoldenDelicious.jpg",
      description:
        "Often called the 'Chameleon' of cider apples. Its juice is very clean and reliable, acting as a perfect canvas that takes on the characteristics of whatever yeast strain or spice profile a cider maker chooses to use.",
      flavorId: sweet.id,
    },
    {
      name: "Braeburn",
      species: "domestica",
      origin: "Nelson, New Zealand",
      category: "CULINARY" as const,
      brix: 13.5,
      ph: 3.3,
      tannin: 0.07,
      imageUrl: "/images/cultivars/culinary_Braeburn.jpg",
      description:
        "A high-quality culinary apple with a classic 'tart-sweet' balance. It provides a robust, apple-forward flavor that holds up well during fermentation, making it a favorite for modern craft cider bases.",
      flavorId: sharp.id,
    },
    {
      name: "Pink Lady",
      species: "domestica",
      origin: "Western Australia",
      category: "CULINARY" as const,
      brix: 14.5,
      ph: 3.2,
      tannin: 0.08,
      imageUrl: "/images/cultivars/culinary_PinkLady.jpg",
      description:
        "Known scientifically as Cripps Pink, this apple is a powerhouse for modern cider. Its exceptionally high sugar and high acid levels allow it to create a punchy, high-ABV single-varietal cider with a zesty finish.",
      flavorId: sharp.id,
    },
    {
      name: "Granny Smith",
      species: "domestica",
      origin: "New South Wales, Australia",
      category: "CULINARY" as const,
      brix: 11.5,
      ph: 3.1,
      tannin: 0.02,
      imageUrl: "/images/cultivars/culinary_GrannySmith.jpg",
      description:
        "The global gold standard for 'sharp' apples. Its intense acidity and low sugar make it a critical tool for cider makers looking to lower the pH of a blend and provide a crisp, tongue-tingling finish.",
      flavorId: sharp.id,
    },
    {
      name: "Akane",
      species: "domestica",
      origin: "Japan",
      category: "CULINARY" as const,
      brix: 12.0,
      ph: 3.2,
      tannin: 0.09,
      imageUrl: "/images/cultivars/culinary_Akane.jpg",
      description:
        "A cross between Jonathan and Worcester Pearmain. It inherits a spicy, strawberry-like aroma and a sharp acidity that provides a surprising amount of complexity for an early-season culinary apple.",
      flavorId: sharp.id,
    },
    {
      name: "Fuji",
      species: "domestica",
      origin: "Fujisaki, Japan",
      category: "CULINARY" as const,
      brix: 15.5,
      ph: 3.7,
      tannin: 0.05,
      imageUrl: "/images/cultivars/culinary_Fuji.jpg",
      description:
        "One of the highest-sugar apples in the grocery store. While it lacks acid and tannin, its sheer sugar content (Brix) makes it an excellent choice for cider makers wanting to reach a higher alcohol percentage naturally.",
      flavorId: sweet.id,
    },
    {
      name: "Gala",
      species: "domestica",
      origin: "New Zealand",
      category: "CULINARY" as const,
      brix: 13.5,
      ph: 3.8,
      tannin: 0.05,
      imageUrl: "/images/cultivars/culinary_Gala.jpg",
      description:
        "A very mild, sub-acid apple with floral and pear-like notes. In cider, it acts as a reliable volume-builder, though it almost always requires the addition of a sharp apple to provide structure.",
      flavorId: sweet.id,
    },
  ];
  const heritageCiderApples = [
    {
      name: "Harrison",
      species: "domestica",
      origin: "Newark, New Jersey",
      category: "HERITAGE_CIDER" as const,
      brix: 16.5,
      ph: 3.6,
      tannin: 0.1,
      imageUrl: "/images/cultivars/heritage_HarrisonCampfield.jpg",
      description:
        "The most famous American cider apple of the 18th century. It produces a thick, syrupy juice that creates a full-bodied, golden cider. While technically a 'Sweet', its high sugar and rich mouthfeel make it a legendary blending component.",
      flavorId: sweet.id,
    },
    {
      name: "Campfield",
      species: "domestica",
      origin: "Newark, New Jersey",
      category: "HERITAGE_CIDER" as const,
      brix: 14.0,
      ph: 3.7,
      tannin: 0.08,
      imageUrl: "/images/cultivars/heritage_HarrisonCampfield.jpg",
      description:
        "Often paired with Harrison to create the famous 'Newark Cider.' It is a smooth, sweet apple that provides a reliable sugar base and a clean fermentation profile, helping to balance the more intense tannins of crabapples.",
      flavorId: sweet.id,
    },
    {
      name: "Tremlett's Bitter",
      species: "domestica",
      origin: "Devon, England",
      category: "HERITAGE_CIDER" as const,
      brix: 12.5,
      ph: 3.9,
      tannin: 0.34,
      imageUrl: "/images/cultivars/heritage_TremlettsBitter.jpg",
      description:
        "A classic English bittersweet. It is famous for its 'hard' tannins that provide a dry, puckering sensation. In cider blends, it is used specifically to add structural 'grip' and an earthy complexity that culinary apples lack.",
      flavorId: bittersweet.id,
    },
    {
      name: "Foxwhelp",
      species: "domestica",
      origin: "Gloucestershire, England",
      category: "HERITAGE_CIDER" as const,
      brix: 12.0,
      ph: 3.1,
      tannin: 0.25,
      imageUrl: "/images/cultivars/heritage_Foxwhelp.jpg",
      description:
        "One of the oldest surviving cider cultivars. A true 'Bittersharp,' it offers high acid and high tannin. It is prized for its unique, musky aroma—often described as 'leather' or 'earth'—and its powerful impact on a blend's structure.",
      flavorId: bittersharp.id,
    },
    {
      name: "Dabinett",
      species: "domestica",
      origin: "Somerset, England",
      category: "HERITAGE_CIDER" as const,
      brix: 14.5,
      ph: 4.1,
      tannin: 0.28,
      imageUrl: "/images/cultivars/heritage_Dabinett.jpg",
      description:
        "The 'reliable king' of English bittersweet apples. It provides a soft, bittersweet character with a rich, smoky flavor. Its low acidity and high tannin make it the perfect partner for sharp culinary apples like Granny Smith.",
      flavorId: bittersweet.id,
    },
    {
      name: "Kingston Black",
      species: "domestica",
      origin: "Somerset, England",
      category: "HERITAGE_CIDER" as const,
      brix: 13.5,
      ph: 3.4,
      tannin: 0.18,
      imageUrl: "/images/cultivars/heritage_KingstonBlack.jpg",
      description:
        "The 'Holy Grail' of cider apples. As a naturally balanced Bittersharp, it contains the perfect ratio of sugar, acid, and tannin to create a world-class cider on its own without any blending required.",
      flavorId: bittersharp.id,
    },
  ];

  const crabapples = [
    {
      name: "Kerr",
      species: "domestica x baccata",
      origin: "Manitoba, Canada",
      category: "CRABAPPLE" as const,
      brix: 14.0,
      ph: 3.3,
      tannin: 0.12,
      imageUrl: "/images/cultivars/crabapple_Kerr.jpg",
      description:
        "A cross between Dolgo and Haralson. Kerr is a large crabapple that offers a brilliant red juice and a savory, tart profile. It is highly valued in cold-climate cider making for its hardiness and reliable acid kick.",
      flavorId: sharp.id,
    },
    {
      name: "John Downie",
      species: "domestica",
      origin: "Dorset, England",
      category: "CRABAPPLE" as const,
      brix: 13.5,
      ph: 3.1,
      tannin: 0.1,
      imageUrl: "/images/cultivars/crabapple_JohnDownie.jpg",
      description:
        "One of the most famous ornamental crabs used for cider. Its orange-red fruits are exceptionally high in pectin and acid, providing a bright, zesty structure and great clarity to heritage cider blends.",
      flavorId: sharp.id,
    },
    {
      name: "Red Sentinel",
      species: "x robusta",
      origin: "New Zealand",
      category: "CRABAPPLE" as const,
      brix: 11.5,
      ph: 3.2,
      tannin: 0.15,
      imageUrl: "/images/cultivars/crabapple_RedSentinel.jpg",
      description:
        "A stunning ornamental crab that produces masses of deep red fruit. In fermentation, it contributes a punchy acidity and a subtle tannic grip, making it a favorite for 'sharpening' up flat dessert-apple musts.",
      flavorId: sharp.id,
    },
    {
      name: "Evereste",
      species: "x perpetu",
      origin: "France",
      category: "CRABAPPLE" as const,
      brix: 13.0,
      ph: 3.2,
      tannin: 0.14,
      imageUrl: "/images/cultivars/crabapple_Evereste.jpg",
      description:
        "Developed for disease resistance and ornamental beauty, Evereste is a secret weapon for cider. It offers a balanced sharp profile with enough tannin to be classified as a light Bittersharp in some climates.",
      flavorId: sharp.id,
    },
    {
      name: "Golden Hornet",
      species: "zumi",
      origin: "England",
      category: "CRABAPPLE" as const,
      brix: 12.0,
      ph: 3.3,
      tannin: 0.08,
      imageUrl: "/images/cultivars/crabapple_GoldenHornet.jpg",
      description:
        "Famous for its vibrant yellow fruit that persists well into winter. Its juice is clean and very sharp, providing a refreshing citric-like acidity that cuts through the 'heavy' flavors of bittersweet cider apples.",
      flavorId: sharp.id,
    },
    {
      name: "Whitney",
      species: "domestica",
      origin: "Illinois, USA",
      category: "CRABAPPLE" as const,
      brix: 13.5,
      ph: 3.6,
      tannin: 0.06,
      imageUrl: "/images/cultivars/crabapple_Whitney.jpg",
      description:
        "A rare 'sweet' crabapple that is actually pleasant to eat fresh. In cider, it acts more like a culinary base but with an aromatic intensity and sugar concentration that standard table apples can't match.",
      flavorId: sweet.id,
    },
    {
      name: "Hyslop",
      species: "domestica",
      origin: "USA (Pre-1869)",
      category: "CRABAPPLE" as const,
      brix: 14.5,
      ph: 3.2,
      tannin: 0.22,
      imageUrl: "/images/cultivars/crabapple_Hyslop.jpg",
      description:
        "A heavy-hitting Bittersharp crab. Its fruit is covered in a thick blue bloom and contains high levels of tannin and pectin, making it essential for adding 'body' and a dry finish to traditional American ciders.",
      flavorId: bittersharp.id,
    },
    {
      name: "Hewes",
      species: "angustifolia x domestica",
      origin: "Virginia, USA",
      category: "CRABAPPLE" as const,
      brix: 15.0,
      ph: 3.3,
      tannin: 0.2,
      imageUrl: "/images/cultivars/crabapple_Hewes.jpg",
      description:
        "Also known as the Virginia Crab. This is a historic powerhouse with high sugar and intense spicy tannins. It was the preferred cider apple of the American Founding Fathers for its dry, sophisticated finish.",
      flavorId: bittersharp.id,
    },
    {
      name: "Wickson",
      species: "domestica",
      origin: "California, USA",
      category: "CRABAPPLE" as const,
      brix: 21.0,
      ph: 3.1,
      tannin: 0.08,
      imageUrl: "/images/cultivars/crabapple_Wickson.jpg",
      description:
        "The sugar king of crabapples. Wickson can reach staggering Brix levels of 25+, providing massive alcohol potential and a searing, vinous acidity that tastes like a concentrated Sauvignon Blanc.",
      flavorId: sharp.id,
    },
    {
      name: "Dolgo",
      species: "baccata",
      origin: "Russia / South Dakota",
      category: "CRABAPPLE" as const,
      brix: 13.0,
      ph: 3.0,
      tannin: 0.1,
      imageUrl: "/images/cultivars/crabapple_Dolgo.jpg",
      description:
        "An ancient Siberian lineage. Dolgo provides a brilliant, fluorescent pink juice and a sharp, cranberry-like acidity. It is one of the best tools for lowering the pH of a blend while adding a beautiful rosy tint.",
      flavorId: sharp.id,
    },
  ];

  for (const apple of culinaryApples) {
    await prisma.cultivar.upsert({
      where: { name: apple.name },
      update: {},
      create: apple,
    });
  }

  for (const apple of heritageCiderApples) {
    await prisma.cultivar.upsert({
      where: { name: apple.name },
      update: {},
      create: apple,
    });
  }

  for (const apple of crabapples) {
    await prisma.cultivar.upsert({
      where: { name: apple.name },
      update: {},
      create: apple,
    });
  }
  console.log("Seeding finished.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
