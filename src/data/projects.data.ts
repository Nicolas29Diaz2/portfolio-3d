import type { ProjectContent } from "@/features/projects/types/projects.types";

export const PROJECTS_DATA: readonly ProjectContent[] = [
  {
    id: 1,
    title: "Portfolio",
    tags: ["React", "R3F", "Blender", "CSS", "TS"],
    description:
      "3D Portafolio with a 3D model of a room and a 3D model of a book.",
    link: "",
    image: "/Images/Projects/Portfolio.webp",
  },
  {
    id: 6,
    title: "Volio Studio",
    tags: ["NextJS", "NestJS", "Cloudfare", "PostgreSQL", "Lemonsqueezy"],
    description:
      "Volio Studio is a platform for creating interactive photo albums and digital magazines with an intuitive professional editor.",
    link: "https://voliostudio.vercel.app",
    image: "/Images/Projects/volio.png",
  },
  {
    id: 4,
    title: "ConTech",
    tags: ["NextJs", "TypeScript", "Mapbox GL", "Recharts"],
    description:
      "Enterprise ConTech platform for geospatial incident management and real-time site operations",
    link: "https://bim-front-beryl.vercel.app",
    image: "/Images/Projects/contech.png",
  },
  {
    id: 3,
    title: "3D-Album",
    tags: ["React", "Node", "Express", "Sequelize", "MySql", "JS", "CSS"],
    description:
      "Dragon Ball 3D book, the data comes from the Dragon Ball API, it is rendered on a canvas that is used as a texture.",
    link: "https://dragonball3dbook.netlify.app/",
    image: "/Images/Projects/3Dbook.webp",
  },
  {
    id: 2,
    title: "Shewhart",
    tags: ["React", "Node", "Express", "Sequelize", "MySql", "JS", "CSS"],
    description:
      "Administration module for the management of resources and students, oriented to support the teaching of statistical quality control.",
    link: "",
    image: "/Images/Projects/Shewhart.webp",
  },
  {
    id: 5,
    title: "ValleTour (UX/UI)",
    tags: ["Figma"],
    description:
      "UX/UI design for a tourism reactivation app in Valle del Cauca, connecting users directly with guides.",
    link: "https://www.behance.net/gallery/144405951/ValleTour",
    image: "/Images/Projects/ValleTour.webp",
  },
];
