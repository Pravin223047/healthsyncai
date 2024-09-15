export const navLinks = [
  {
    id: 1,
    name: "Hero",
    href: "#hero",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Features",
    href: "#features",
  },
  {
    id: 4,
    name: "Why HealthSync.ai",
    href: "#work",
  },
  {
    id: 5,
    name: "Emergency",
    href: "#emergency",
  },
  {
    id: 6,
    name: "Community",
    href: "#community",
  },
  {
    id: 7,
    name: "Contact",
    href: "#contact",
  },
];

export const myProjects = [
  {
    title: "Emergency - Real-Time Health Response System",
    desc: "Emergency is a robust platform designed to provide real-time emergency health assistance by instantly connecting users with nearby healthcare professionals and hospitals. With geolocation and rapid response alerts, it ensures that help is just a click away during critical moments.",
    subdesc:
      "Emergency provides real-time assistance by instantly connecting users to nearby hospitals and healthcare professionals. With geolocation and swift communication, it ensures rapid response during critical situations, making it essential when every second counts.",
    href: "https://www.youtube.com/watch?v=emergencyconnect_demo",
    texture:
      "https://i.pinimg.com/originals/aa/75/99/aa7599d3e06313422c51fd15543ed97f.gif",
    logo: "🚨",
    logoStyle: {
      border: "0.2px solid #FF2F2F",
      boxShadow: "0px 0px 60px 0px #FF74744D",
    },
    spotlight: "🆘",
    tags: [
      {
        id: 1,
        name: "Ambulace",
        path: "🚑",
      },
      {
        id: 2,
        name: "Hospital",
        path: "🏥",
      },
      {
        id: 3,
        name: "SOS",
        path: "🆘",
      },
      {
        id: 4,
        name: "Alert Bell",
        path: "🚨",
      },
    ],
  },
  {
    title: "CommunityCare - Connecting Doctors and Patients",
    desc: "CommunityCare connects users with healthcare providers, simplifying consultation scheduling and medical record access. It ensures personalized care advice, enhancing the overall healthcare experience. The platform's user-friendly interface streamlines communication and support between patients and doctors. CommunityCare offers a more efficient and responsive way to manage healthcare needs.",
    subdesc:
      "CommunityCare connects users directly with healthcare providers, simplifying appointment scheduling, access to medical records, and personalized care. It enhances communication between doctors and patients, improving the overall healthcare experience.",
    href: "https://www.youtube.com/watch?v=communitycare_demo",
    texture:
      "https://i.pinimg.com/originals/4b/22/93/4b229396885b90ea126258e5d19370ec.gif",
    logo: "🏥",
    logoStyle: {
      border: "0.2px solid #005BB5",
      boxShadow: "0px 0px 60px 0px #0078D44D",
    },
    spotlight: "🩺",
    tags: [
      {
        id: 1,
        name: "Community",
        path: "👨‍👨‍👦‍👦",
      },
      {
        id: 2,
        name: "Equipment",
        path: "🩺",
      },
      {
        id: 3,
        name: "globe",
        path: "🌍",
      },
      {
        id: 4,
        name: "Doctor",
        path: "👨🏻‍⚕️",
      },
    ],
  },
];

interface CalculateSizesProps {
  isSmall: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

export const calculateSizes = ({
  isSmall,
  isMobile,
  isTablet,
}: CalculateSizesProps) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],

    cubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
      ? [5, -5, 0]
      : isTablet
      ? [5, -5, 0]
      : [9, -5.5, 0],

    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
      ? [5, 4, 0]
      : isTablet
      ? [5, 4, 0]
      : [12, 3, 0],

    ringPosition: isSmall
      ? [-5, 7, 0]
      : isMobile
      ? [-10, 10, 0]
      : isTablet
      ? [-12, 10, 0]
      : [-24, 10, 0],

    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
      ? [-9, -10, -10]
      : isTablet
      ? [-11, -7, -10]
      : [-13, -13, -10],
  };
};
