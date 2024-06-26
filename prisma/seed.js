const { getDataFromCSV, cleanCSVStringToJSON } = require("../data/utils");
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

async function seedWardContactInfoData() {
  const wardContactData =
    await getDataFromCSV(process.cwd() + '/data/ward_contact_info.csv');
  for (const w of wardContactData) {
    w.ward = +w.ward;
    w.websites = cleanCSVStringToJSON(w.websites);
  }
  await prisma.ward_contact_info.createMany({
    data: wardContactData
  });

  //for logging
  const aggregate = await prisma.ward_contact_info.aggregate({
    _count: { ward: true }
  });
  console.log("inserted", aggregate._count.ward, "ward_contact_info records");
}

async function seedWardSpendingItems() {
  const wardSpendingData =
    await getDataFromCSV(process.cwd() + '/data/2005-2023_ward_spending_items.csv');
    for (const item of wardSpendingData) {
      item.ward = +item.ward;
      item.year = +item.year;
      item.cost = +item.cost;
      item.geocodeId = +item.geocodeId;
      item.multiLocationId = +item.multiLocationId;
    }
  await prisma.ward_spending_item.createMany({
    data: wardSpendingData
  });

  //for logging
  const aggregate = await prisma.ward_spending_item.aggregate({
    _count: { id: true }
  });
  console.log("inserted", aggregate._count.id, "ward_spending_item records");
}

async function seedSpendingMultiLocationMapping() {
  const mappingData =
    await getDataFromCSV(process.cwd() + '/data/2005-2023_spending_multiLocationId_mapping.csv');
  for (const item of mappingData) {
    item.geocodeId = +item.geocodeId;
    item.multiLocationId = +item.multiLocationId;
  }
  await prisma.spending_multi_location_id_mapping.createMany({
    data: mappingData
  });

  //for logging
  const aggregate = await prisma.spending_multi_location_id_mapping.aggregate({
    _count: { id: true }
  });
  console.log("inserted", aggregate._count.id, "spending_multi_location_id_mapping records");
}

//call DB seending functions here
async function main() {
  await seedWardContactInfoData();
  await seedWardSpendingItems();
  await seedSpendingMultiLocationMapping();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
