import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    title: "MERN Eats",
    description:
      "A food delivery application built with the MERN stack featuring authentication, order tracking and payment integration.",
    image: "/merneats.png",
    liveUrl: "https://mern-food-ordering-frontend-vbre.onrender.com/",
    githubUrl: "https://github.com/Vitalis058/mern-food-ordering-frontend",
    featured: true,
    tags: ["MERN", "React", "Node.js", "MongoDB", "Food Delivery"],
  },
  {
    title: "MERN Blog",
    description:
      "A blog application built with the MERN stack featuring real-time post updates and user authentication.",
    image: "/mern-blog.png",
    liveUrl: "https://mern-blog-il8b.onrender.com/",
    githubUrl: "https://github.com/Vitalis058/blog",
    featured: true,
    tags: ["MERN", "React", "Node.js", "MongoDB", "Blog"],
  },
  {
    title: "Tumaini Fitness Website",
    description:
      "A safari and tour operator platform highlighting packages, photo galleries, and inquiry forms.",
    image: "/tumaini-fitness.png",
    liveUrl: "https://www.tumainifitness.co.ke/",
    tags: ["Next.js", "Fitness", "Business Website"],
  },
  {
    title: "Rithord Travels",
    description:
      "A travel agency site offering destination packages, booking features, and client testimonials.",
    image: "/rithord-travels.png",
    liveUrl: "http://rithord-main.vercel.app/",
    tags: ["Next.js", "Travel", "Business Website"],
  },
  {
    title: "Ezz Freedom and Hope",
    description:
      "An organization site focused on mental health awareness, empowerment programs, and selling mental health books.",
    image: "/ezz-freedom-hope.png",
    liveUrl: "https://www.ezzfreedomandhope.or.ke/",
    tags: ["Next.js", "Mental Health", "Organization"],
  },
  {
    title: "Selah Safaris",
    description:
      "A safari and tour operator platform highlighting packages, photo galleries, and inquiry forms.",
    image: "/selah-safaris.png",
    liveUrl: "https://selah-safaris.vercel.app/",
    tags: ["Next.js", "Safari", "Tourism"],
  },
  {
    title: "Tumaini Gym",
    description:
      "A fitness center web app with schedules, events update and the pricing section",
    image: "/tumaini-gym.png",
    liveUrl: "https://gym.tumainifitness.co.ke/",
    tags: ["Next.js", "Gym", "Fitness"],
  },
  {
    title: "School Management System",
    description:
      "A comprehensive school management platform built with Next js, Node.js, and Prisma, featuring student, teacher, and class administration.",
    image: "/school-sms.png",
    liveUrl: "https://school-sms-frontend.vercel.app/",
    githubUrl: "https://github.com/Vitalis058/school-sms-frontend",
    featured: true,
    tags: ["Next.js", "Node.js", "Prisma", "School Management"],
  },
  {
    title: "Social Media App",
    description:
      "A social media platform with authentication, user profiles, real-time chat, and post sharing features, built using Next js",
    image: "/next-social.png",
    liveUrl: "https://next-social-gilt.vercel.app/",
    githubUrl: "https://github.com/Vitalis058/next-social",
    featured: true,
    tags: ["Next.js", "Social Media", "Real-time Chat"],
  },
];

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();

  // Seed projects
  for (const project of projects) {
    const result = await prisma.project.create({
      data: project,
    });
    console.log(`Created project with id: ${result.id}`);
  }

  // Seed a sample blog post
  const sampleBlogPost = await prisma.blogPost.create({
    data: {
      title: "Welcome to Spence Creations Blog",
      slug: "welcome-to-spence-creations-blog",
      content:
        "This is our first blog post! We'll be sharing insights about web development, design trends, and our latest projects.",
      excerpt:
        "Welcome to our blog where we share web development insights and project updates.",
      status: "PUBLISHED",
      categories: ["Web Development", "Company News"],
      tags: ["welcome", "introduction", "web development"],
      author: "Vitalis Maina",
      publishedAt: new Date(),
      metaDescription:
        "Welcome to Spence Creations blog - your source for web development insights and project updates.",
      metaKeywords: [
        "web development",
        "spence creations",
        "blog",
        "portfolio",
      ],
    },
  });

  console.log(`Created blog post with id: ${sampleBlogPost.id}`);
  console.log("Seeding finished.");
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
