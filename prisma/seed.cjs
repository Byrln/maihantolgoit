const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function doc(text) {
  return {
    type: "doc",
    content: text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({
        type: "paragraph",
        content: [{ type: "text", text: line }],
      })),
  };
}

async function media(url, alt) {
  const existing = await prisma.media.findFirst({ where: { url } });

  if (existing) {
    return existing;
  }

  return prisma.media.create({
    data: { url, alt },
  });
}

async function seedPages(mediaByKey) {
  const pages = [
    {
      slug: "home",
      title: "Maikhan Tolgoi Tourist Camp",
      summary: "Comfort, nature, and genuine Mongolian hospitality on the northern shore of Terkhiin Tsagaan Lake.",
      body: "Maikhan Tolgoi Tourist Camp has welcomed travelers to Khorgo-Terkh National Park since 2004.",
      heroImageId: mediaByKey.homeHero.id,
      sections: [
        {
          id: "home-intro",
          type: "text",
          title: "Welcome to Maikhan Tolgoi",
          body: "Situated within the untouched beauty of Khorgo-Terkh National Park, Maikhan Tolgoi Tourist Camp is a place of comfort amid nature. Located on the northern shore of Terkhiin Tsagaan Lake, the camp has served travelers since 2004 with warm hospitality, fresh food, and peaceful views.",
        },
        {
          id: "home-directions",
          type: "imageText",
          title: "How to get to Maikhan Tolgoi camp?",
          body: "The camp is located 670 km from Ulaanbaatar and 15 km from Tariat soum in Arkhangai province. The road crosses the Khangai landscape before reaching the northern shore of Terkhiin Tsagaan Lake.",
          imageUrl: mediaByKey.bookBanner.url,
          imageAlt: mediaByKey.bookBanner.alt,
          imagePosition: "right",
        },
        {
          id: "home-gallery",
          type: "gallery",
          title: "Life at the camp",
          body: "A closer look at the landscape, dining, accommodation, and everyday moments around Maikhan Tolgoi.",
          items: mediaByKey.gallery.map((entry, index) => ({
            id: `home-gallery-${index + 1}`,
            title: ["Lakeside mornings", "Fresh camp dining", "Traditional hospitality", "Quiet spaces", "Khangai landscape", "Evening at camp"][index],
            imageUrl: entry.url,
            imageAlt: entry.alt,
          })),
        },
        {
          id: "home-review",
          type: "imageText",
          title: "A stay guests remember",
          body: "Guests value the peaceful location, attentive team, fresh meals, and the warmth of a traditional Mongolian stay. The camp is a comfortable base for exploring the lake and Khorgo Volcano.",
          imageUrl: mediaByKey.review.url,
          imageAlt: mediaByKey.review.alt,
          imagePosition: "left",
        },
        {
          id: "home-horse-tour",
          type: "feature",
          title: "Explore Khorgo Volcano",
          body: "Plan a full-day horse journey through the open Khangai landscape to Khorgo Volcano with local guidance from the camp.",
          imageUrl: mediaByKey.horseTour.url,
          imageAlt: mediaByKey.horseTour.alt,
        },
      ],
    },
    {
      slug: "about-us",
      title: "Maikhan Tolgoi Tourist Camp",
      summary:
        'In summer of 2004, the founders camped on the northern shore of Terkhiin Tsagaan Lake in a beautiful place called "Maikhan Tolgoi." Captivated by the scenery and atmosphere, they realized this was the perfect location for a tourist camp.',
      body:
        "We prioritize the comfort and needs of our guests while operating in an eco-friendly and sustainable manner. From responsible energy and water use to waste sorting and disposal, we are committed to preserving the natural beauty of our surroundings.\nWhat sets our camp apart is not only the stunning landscape but also our high-quality professional service. To ensure an exceptional experience for our guests, 80% of our staff are skilled professionals in the tourism and hospitality industry.",
      heroImageId: mediaByKey.aboutHero.id,
      sections: [
        {
          id: "about-story",
          type: "imageText",
          title: "Our story",
          body: "In summer 2004, the founders camped on the northern shore of Terkhiin Tsagaan Lake at a beautiful place called Maikhan Tolgoi. Captivated by the scenery and atmosphere, they realized it was the perfect location for a tourist camp. Today we continue to put guest comfort, professional service, and responsible care for nature at the center of every stay.",
          imageUrl: mediaByKey.aboutIntro.url,
          imageAlt: mediaByKey.aboutIntro.alt,
          imagePosition: "left",
        },
        {
          id: "about-team",
          type: "gallery",
          title: "Our team",
          body: "Experienced tourism and hospitality professionals who make every visit comfortable and memorable.",
          items: mediaByKey.team.map((entry, index) => ({
            id: `team-${index + 1}`,
            title: ["Battsetseg Lombojamba", "Myagmar Shar", "Oyun Myagmar", "Delgermaa Altankhuyag", "Bayarsaikhan Molomjamts", "Bolortuya Batsaikhan"][index],
            subtitle: ["Founder", "Founder", "CEO", "General Manager", "Head Chef", "Service Staff"][index],
            imageUrl: entry.url,
            imageAlt: entry.alt,
          })),
        },
      ],
    },
    {
      slug: "accommodation",
      title: "Accommodation",
      summary: "Welcome to our accommodation options, where comfort meets tradition in a stunning natural setting.",
      body:
        "We offer distinct types of accommodation for guests who want to experience traditional Mongolian ger living, a warmer wooden cabin retreat, or a compact dome stay close to the lake.",
      heroImageId: mediaByKey.accommodationHero.id,
      sections: [
        {
          id: "accommodation-intro",
          type: "text",
          title: "Stay close to nature",
          body: "Choose a traditional Mongolian ger, a deluxe ger with a private bathroom, a modern dome, or a warm wooden cabin. Every option is managed below as live accommodation data in the CMS.",
        },
      ],
    },
    {
      slug: "amenities-facilities",
      title: "Amenities & Facilities",
      summary:
        "At Maikhan Tolgoi Tourist Camp, we provide a comfortable and authentic Mongolian experience while keeping guests close to nature.",
      body:
        "Whether you seek adventure, relaxation, or cultural immersion, our camp is equipped with dining, activities, guest services, and essential facilities for a seamless stay.",
      heroImageId: mediaByKey.amenitiesHero.id,
      sections: [
        {
          id: "amenities-dining",
          type: "imageText",
          title: "Dining & Food Services",
          body: "Savor the flavors of Mongolia at our on-site restaurant, with traditional and international dishes prepared from fresh ingredients. Khorkhog, barbecue evenings, vegetarian meals, and dietary-friendly options can be arranged.",
          imageUrl: mediaByKey.dining.url,
          imageAlt: mediaByKey.dining.alt,
          imagePosition: "right",
        },
        {
          id: "amenities-activities",
          type: "gallery",
          title: "Activities & Recreation",
          body: "Explore the landscape around Maikhan Tolgoi through outdoor, cultural, and family-friendly activities.",
          items: mediaByKey.activities.map((entry, index) => ({
            id: `activity-${index + 1}`,
            title: ["Bicycle", "Bow & Arrow", "Basketball", "Horse Riding", "ATV", "Visit a herder family", "Table tennis", "Campfire evenings", "Fishing", "Laundry service"][index],
            imageUrl: entry.url,
            imageAlt: entry.alt,
          })),
        },
        {
          id: "amenities-volcano",
          type: "feature",
          title: "Khorgo Volcano",
          body: "Hike to the crater of the extinct Khorgo Volcano for panoramic views across lava fields, basalt formations, and the wide Arkhangai landscape.",
          imageUrl: mediaByKey.volcano.url,
          imageAlt: mediaByKey.volcano.alt,
        },
        {
          id: "amenities-relaxation",
          type: "gallery",
          title: "Relaxation & Entertainment",
          body: "Slow down beside the lake, spend time on the water, and enjoy the clear night sky.",
          items: [
            { id: "relax-boating", title: "Boating", subtitle: "On the lake's crystal-clear waters", imageUrl: mediaByKey.boating.url, imageAlt: mediaByKey.boating.alt },
            { id: "relax-stargazing", title: "Stargazing", subtitle: "Under the pristine Khangai night sky", imageUrl: mediaByKey.stargazing.url, imageAlt: mediaByKey.stargazing.alt },
          ],
        },
        {
          id: "amenities-lake",
          type: "feature",
          title: "Terkhiin Tsagaan Lake",
          body: "Crystal-clear water, surrounding hills, lava fields, and open meadows make the lake a peaceful place for fishing, boating, swimming, and unhurried days in nature.",
          imageUrl: mediaByKey.lake.url,
          imageAlt: mediaByKey.lake.alt,
        },
        {
          id: "amenities-services",
          type: "text",
          title: "Essential Services & Extras",
          body: "Free Wi-Fi in common areas\nElectricity and charging stations\nSouvenir shop with locally handcrafted goods\nLaundry service on request\nSecure parking for private vehicles and tour buses",
        },
      ],
    },
    {
      slug: "services",
      title: "Services",
      summary:
        "We support travelers, families, groups, and tour operators with accommodation, meals, outdoor experiences, and practical camp services at Terkhiin Tsagaan Lake.",
      body: "Our team helps guests plan stays, arrange local day trips, enjoy fresh meals, and experience the surrounding nature with practical support from the camp.",
      heroImageId: mediaByKey.footer.id,
      sections: [
        { id: "services-intro", type: "text", title: "Plan your stay with local support", body: "Our published services below are managed directly in the CMS and ordered by publication date." },
      ],
    },
    {
      slug: "blog",
      title: "Blog",
      summary: "Travel notes, route ideas, and seasonal stories from Maikhan Tolgoi Tourist Camp.",
      body: "Read practical notes about reaching the camp, exploring Khorgo Volcano, and slowing down beside Terkhiin Tsagaan Lake.",
      heroImageId: mediaByKey.lake.id,
      sections: [
        { id: "blog-intro", type: "text", title: "Stories from Maikhan Tolgoi", body: "Travel notes, route ideas, and seasonal stories published directly by the camp team." },
      ],
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        summary: page.summary,
        body: doc(page.body),
        sections: page.sections,
        heroImageId: page.heroImageId,
      },
      create: {
        title: page.title,
        slug: page.slug,
        summary: page.summary,
        body: doc(page.body),
        sections: page.sections,
        heroImageId: page.heroImageId,
      },
    });
  }
}

async function seedPosts(mediaByKey) {
  const publishedAt = new Date("2026-07-20T00:00:00.000Z");
  const posts = [
    {
      title: "How to reach Maikhan Tolgoi from Ulaanbaatar",
      slug: "how-to-reach-maikhan-tolgoi-from-ulaanbaatar",
      category: "Travel guide",
      excerpt:
        "The camp is 670 km from Ulaanbaatar and 15 km from Tariat soum, on the northern shore of Lake Terkhiin Tsagaan.",
      body:
        "Maikhan Tolgoi Tourist Camp sits on the northern shore of Terkhiin Tsagaan Lake in Arkhangai province. The route from Ulaanbaatar is long, but it rewards travelers with open steppe, Khangai mountain views, and quiet lake scenery.",
      coverImageId: mediaByKey.homeHero.id,
    },
    {
      title: "A day ride to Khorgo Volcano",
      slug: "a-day-ride-to-khorgo-volcano",
      category: "Activities",
      excerpt: "Ride through open Khangai landscapes, hike the crater, and return to camp before evening.",
      body:
        "The Khorgo Volcano route is one of the most memorable day experiences from the camp. Guests can ride through open landscapes, reach the crater, explore the volcanic formations, and return for a warm evening at Maikhan Tolgoi.",
      coverImageId: mediaByKey.volcano.id,
    },
    {
      title: "Why Terkhiin Tsagaan Lake is worth slowing down for",
      slug: "why-terkhiin-tsagaan-lake-is-worth-slowing-down-for",
      category: "Nature",
      excerpt:
        "Crystal-clear water, lava fields, wildlife, and a wide sky make the lake one of central Mongolia's great retreats.",
      body:
        "Terkhiin Tsagaan Lake is a place to slow down. The water, lava fields, birds, volcanic ridges, and big Khangai sky make it a calm base for travelers who want nature without rushing.",
      coverImageId: mediaByKey.lake.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        body: doc(post.body),
        coverImageId: post.coverImageId,
        publishedAt,
      },
      create: {
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        body: doc(post.body),
        coverImageId: post.coverImageId,
        publishedAt,
      },
    });
  }
}

async function seedServices(mediaByKey) {
  const publishedAt = new Date("2026-07-20T00:00:00.000Z");
  const services = [
    {
      title: "Stay Planning",
      slug: "stay-planning",
      excerpt: "Choose the right ger, dome, or wooden cabin for your group size, season, and preferred comfort level.",
      body: "We help travelers choose the right accommodation based on group size, season, comfort needs, and trip style.",
      imageId: mediaByKey.accommodationHero.id,
      sortOrder: 1,
    },
    {
      title: "Guided Day Trips",
      slug: "guided-day-trips",
      excerpt: "Arrange horse routes, Khorgo Volcano trips, boating, fishing, herder family visits, and lake activities.",
      body: "Horseback routes, volcano visits, lake activities, and cultural experiences can be arranged from the camp.",
      imageId: mediaByKey.horseTour.id,
      sortOrder: 2,
    },
    {
      title: "Meals and Camp Hosting",
      slug: "meals-and-camp-hosting",
      excerpt: "Enjoy Mongolian food services, khorkhog, barbecue nights, breakfast, and group dining support.",
      body: "Fresh local meals, warm hosting, and flexible dining support are available for families, groups, and tour operators.",
      imageId: mediaByKey.dining.id,
      sortOrder: 3,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        title: service.title,
        excerpt: service.excerpt,
        body: doc(service.body),
        imageId: service.imageId,
        sortOrder: service.sortOrder,
        publishedAt,
      },
      create: {
        title: service.title,
        slug: service.slug,
        excerpt: service.excerpt,
        body: doc(service.body),
        imageId: service.imageId,
        sortOrder: service.sortOrder,
        publishedAt,
      },
    });
  }
}

async function seedAccommodations(mediaByKey) {
  const accommodations = [
    {
      title: "Mongolian Traditional Ger",
      summary:
        "Experience authentic Mongolian culture in our traditional gers, featuring cozy interiors and a unique atmosphere for an immersive stay.",
      details: ["Number of bed: twin & triple bed", "Bed size: 90cmx200cm", "Occupancy: Max. 3 person", "Heating system: Wood stove", "Cloth hangers", "Teacups", "Towels", "Slippers", "Non-smoking", "Breakfast available"],
      imageId: mediaByKey.traditionalGer.id,
      sortOrder: 1,
    },
    {
      title: "Deluxe Tsomtsog Ger",
      summary:
        "Our Deluxe Tsomtsog Ger offers an ensuite bathroom for a more private and comfortable stay while maintaining traditional Mongolian design.",
      details: ["Number of bed: 3", "Bed size: 110cmx200cm", "Occupancy: Max. 3 person", "Heating system: Wood stove", "Private bathroom", "Cloth hangers", "Teacups", "Towels", "Slippers", "Non-smoking", "Breakfast available"],
      imageId: mediaByKey.deluxeGer.id,
      sortOrder: 2,
    },
    {
      title: "Tsomtsog Ger",
      summary:
        "Simple and peaceful gers for guests who want traditional living close to nature without an ensuite bathroom.",
      details: ["Number of bed: 3 or 4 beds", "Bed size: 90cmx200cm", "Occupancy: Max. 4 person", "Heating system: Wood stove", "Cloth hangers", "Teacups", "Towels", "Slippers", "Non-smoking", "Breakfast available"],
      imageId: mediaByKey.tsomtsogGer.id,
      sortOrder: 3,
    },
    {
      title: "Dome House",
      summary:
        "A modern twist on comfort, ideal for guests seeking a compact and cozy stay in a natural setting.",
      details: ["Number of bed: 2 beds", "Bed size: 90cmx200cm", "Occupancy: 2 person", "Heating system: Electric", "Lake view windows", "Cloth hangers", "Teacups", "Towels", "Slippers", "Non-smoking", "Breakfast available"],
      imageId: mediaByKey.dome.id,
      sortOrder: 4,
    },
    {
      title: "Wooden Cabins",
      summary:
        "Warm wooden cabins for guests who prefer a private, home-like retreat during cooler Khangai days.",
      details: ["Number of bed: 2 beds", "Bed size: 90cmx200cm", "Occupancy: 2 person", "Heating system: Electric", "Lake view windows", "Cloth hangers", "Teacups", "Towels", "Slippers", "Non-smoking", "Breakfast available"],
      imageId: mediaByKey.cabin.id,
      sortOrder: 5,
    },
  ];

  for (const item of accommodations) {
    const existing = await prisma.accommodation.findFirst({ where: { title: item.title } });

    if (existing) {
      await prisma.accommodation.update({ where: { id: existing.id }, data: item });
    } else {
      await prisma.accommodation.create({ data: item });
    }
  }
}

async function seedNavigation() {
  const count = await prisma.navLink.count();

  if (count > 0) {
    return;
  }

  await prisma.navLink.createMany({
    data: [
      { label: "Home", href: "/", sortOrder: 1 },
      { label: "About us", href: "/about-us", sortOrder: 2 },
      { label: "Accommodation", href: "/accommodation", sortOrder: 3 },
      { label: "Amenities & Facilities", href: "/amenities-facilities", sortOrder: 4 },
      { label: "Services", href: "/services", sortOrder: 5 },
      { label: "Blog", href: "/blog", sortOrder: 6 },
      { label: "Book now", href: "https://booking.maikhantolgoi.com/room-rates?arrivalDate=&departureDate=", sortOrder: 7 },
    ],
  });
}

async function main() {
  const mediaByKey = {
    homeHero: await media("/assets/exported/444c48eb82d8.png", "Maikhan Tolgoi camp hero"),
    bookBanner: await media("/assets/exported/6e796456f04d.png", "Book a stay at Maikhan Tolgoi"),
    review: await media("/assets/exported/a8a989641e1a.jpg", "Guest experience at Maikhan Tolgoi"),
    aboutHero: await media("/assets/exported/b60c628e6612.jpg", "Maikhan Tolgoi landscape"),
    aboutIntro: await media("/assets/exported/7d01601f7636.png", "Maikhan Tolgoi camp sign"),
    accommodationHero: await media("/assets/exported/ce6ce00d34df.jpg", "Accommodation at Maikhan Tolgoi"),
    amenitiesHero: await media("/assets/exported/d10d48ae2cf4.jpg", "Terkhiin Tsagaan Lake"),
    footer: await media("/assets/exported/a27ccb4cc3fa.jpg", "Aerial view of Maikhan Tolgoi"),
    lake: await media("/assets/exported/d10d48ae2cf4.jpg", "Terkhiin Tsagaan Lake"),
    volcano: await media("/assets/exported/d868e856ac51.jpg", "Khorgo Volcano"),
    horseTour: await media("/assets/exported/73924b8e50eb.jpg", "Horse tour near Khorgo Volcano"),
    dining: await media("/assets/exported/37483c9d2d3d.jpg", "Dining at Maikhan Tolgoi"),
    boating: await media("/assets/exported/f1ae61f2fefb.jpg", "Boating on Terkhiin Tsagaan Lake"),
    stargazing: await media("/assets/exported/cf06f38f8022.jpg", "Stargazing at Maikhan Tolgoi"),
    traditionalGer: await media("/assets/exported/cdc9c93c1b17.jpg", "Mongolian Traditional Ger"),
    deluxeGer: await media("/assets/exported/12ff2d6dc3a8.jpg", "Deluxe Tsomtsog Ger"),
    tsomtsogGer: await media("/assets/exported/950f28831088.jpg", "Tsomtsog Ger"),
    dome: await media("/assets/exported/ec223c3a952e.jpg", "Dome House"),
    cabin: await media("/assets/exported/6c5edf930e54.jpg", "Wooden Cabins"),
    gallery: await Promise.all([
      media("/assets/exported/5c9aa043d4e3.jpg", "Lakeside morning at Maikhan Tolgoi"),
      media("/assets/exported/37483c9d2d3d.jpg", "Fresh camp dining"),
      media("/assets/exported/709f2e30fabb.jpg", "Traditional camp hospitality"),
      media("/assets/exported/02defa9c0ca9.png", "Quiet spaces at the camp"),
      media("/assets/exported/c33ffa2a9d61.jpg", "Khangai landscape"),
      media("/assets/exported/6685ecbedea9.jpg", "Evening at Maikhan Tolgoi"),
    ]),
    team: await Promise.all([
      media("/assets/exported/3b108eec0a16.jpg", "Battsetseg Lombojamba"),
      media("/assets/exported/155ad2152615.jpg", "Myagmar Shar"),
      media("/assets/exported/138a9ccdbbb1.jpg", "Oyun Myagmar"),
      media("/assets/exported/64d370362e4d.jpg", "Delgermaa Altankhuyag"),
      media("/assets/exported/7c0a8169a4f3.jpg", "Bayarsaikhan Molomjamts"),
      media("/assets/exported/d1ea989ad1c6.jpg", "Bolortuya Batsaikhan"),
    ]),
    activities: await Promise.all([
      media("/assets/exported/3f7d53d24cba.jpg", "Bicycle activity"),
      media("/assets/exported/3781de79ba05.jpg", "Bow and arrow activity"),
      media("/assets/exported/d665243c13b0.jpg", "Basketball activity"),
      media("/assets/exported/f2605c544ac8.jpg", "Horse riding"),
      media("/assets/exported/427e387eedcd.jpg", "ATV activity"),
      media("/assets/exported/319210c268ce.jpg", "Visiting a herder family"),
      media("/assets/exported/64f491793054.jpg", "Table tennis"),
      media("/assets/exported/1c3cbf405d0f.jpg", "Campfire evening"),
      media("/assets/exported/1091a0dc0bb7.jpg", "Fishing"),
      media("/assets/exported/dc30e5aa9d6e.jpg", "Laundry service"),
    ]),
  };

  await seedPages(mediaByKey);
  await seedPosts(mediaByKey);
  await seedServices(mediaByKey);
  await seedAccommodations(mediaByKey);
  await seedNavigation();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
