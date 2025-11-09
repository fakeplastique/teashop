import "reflect-metadata";
import { getDataSource } from "./db";
import { Tea } from "@/entities/Tea";
import { StaticPage } from "@/entities/StaticPage";

export async function seedDatabase() {
  const dataSource = await getDataSource();
  const teaRepository = dataSource.getRepository(Tea);
  const staticPageRepository = dataSource.getRepository(StaticPage);

  // Check if data already exists
  const teaCount = await teaRepository.count();
  if (teaCount > 0) {
    console.log("Database already seeded");
    return;
  }

  // Seed Tea data
  const teas = [
    {
      name: "Dragon Well",
      price: 25.99,
      photoUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
      region: "Hangzhou, China",
      description: "A legendary Chinese green tea with a distinctive flat appearance and sweet, mellow flavor.",
      numberOfLikes: 0,
    },
    {
      name: "Darjeeling First Flush",
      price: 32.50,
      photoUrl: "https://images.unsplash.com/photo-1597318130044-4f8a6fc9f2d0?w=400",
      region: "Darjeeling, India",
      description: "Known as the 'champagne of teas', this black tea has a delicate floral aroma.",
      numberOfLikes: 0,
    },
    {
      name: "Matcha Supreme",
      price: 45.00,
      photoUrl: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400",
      region: "Uji, Japan",
      description: "Premium ceremonial grade matcha with rich umami flavor and vibrant green color.",
      numberOfLikes: 0,
    },
    {
      name: "Silver Needle",
      price: 38.99,
      photoUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      region: "Fujian, China",
      description: "Delicate white tea made from young tea buds with a subtle sweet taste.",
      numberOfLikes: 0,
    },
    {
      name: "Assam Bold",
      price: 18.99,
      photoUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400",
      region: "Assam, India",
      description: "A robust, malty black tea perfect for breakfast with milk and sugar.",
      numberOfLikes: 0,
    },
    {
      name: "Tie Guan Yin",
      price: 29.50,
      photoUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
      region: "Anxi, China",
      description: "Premium oolong tea with orchid-like fragrance and smooth, complex flavor.",
      numberOfLikes: 0,
    },
    {
      name: "Earl Grey Imperial",
      price: 22.00,
      photoUrl: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400",
      region: "London Blend",
      description: "Classic black tea infused with bergamot oil for a citrusy, aromatic experience.",
      numberOfLikes: 0,
    },
    {
      name: "Sencha Organic",
      price: 24.99,
      photoUrl: "https://images.unsplash.com/photo-1563822249366-1b896555aaa8?w=400",
      region: "Shizuoka, Japan",
      description: "Fresh, grassy Japanese green tea with a clean, slightly astringent finish.",
      numberOfLikes: 0,
    },
  ];

  await teaRepository.save(teas);
  console.log("Tea data seeded successfully");

  // Seed Static Page
  const teaRulesPage = staticPageRepository.create({
    slug: "tea-rules",
    title: "The Art of Tea: Essential Rules",
    type: "guide",
    content: `
      <h1>The Art of Tea: Essential Rules</h1>

      <h2>Water Temperature Matters</h2>
      <p>Different teas require different water temperatures:</p>
      <ul>
        <li><strong>White Tea:</strong> 160-185°F (70-85°C)</li>
        <li><strong>Green Tea:</strong> 160-180°F (70-80°C)</li>
        <li><strong>Oolong Tea:</strong> 180-190°F (80-90°C)</li>
        <li><strong>Black Tea:</strong> 200-212°F (90-100°C)</li>
      </ul>

      <h2>Steeping Time</h2>
      <p>Over-steeping can make tea bitter. Follow these guidelines:</p>
      <ul>
        <li><strong>White Tea:</strong> 4-5 minutes</li>
        <li><strong>Green Tea:</strong> 2-3 minutes</li>
        <li><strong>Oolong Tea:</strong> 3-5 minutes</li>
        <li><strong>Black Tea:</strong> 3-5 minutes</li>
      </ul>

      <h2>Tea Storage</h2>
      <p>Store tea in an airtight container away from light, moisture, and strong odors.
      Tea leaves are delicate and can absorb surrounding scents.</p>

      <h2>Use Quality Water</h2>
      <p>Since tea is 99% water, use fresh, filtered water for the best taste.
      Avoid distilled water as it can make tea taste flat.</p>

      <h2>The Right Amount</h2>
      <p>Generally, use 1 teaspoon of loose leaf tea per 8 oz cup of water.
      Adjust to taste - some prefer stronger or weaker tea.</p>
    `,
  });

  await staticPageRepository.save(teaRulesPage);
  console.log("Static page seeded successfully");
}
