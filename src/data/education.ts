/** Education, highest and most recent first. */

export type Education = {
  id: string;
  credential: string;
  field: string;
  school: string;
  detail: string;
  period: string;
};

export const education: Education[] = [
  {
    id: "bscs",
    credential: "Bachelor of Science",
    field: "Computer Science",
    school: "University of Karachi",
    detail: "In progress.",
    period: "2024 — Present",
  },
  {
    id: "dae",
    credential: "Diploma of Associate Engineering",
    field: "Computer Information Technology",
    school: "Aligarh Institute of Technology",
    detail: "Completed with a bronze medal.",
    period: "2023",
  },
  {
    id: "hssc",
    credential: "Higher Secondary Certificate",
    field: "General Science",
    school: "Govt. Degree Science & Commerce College, Karachi",
    detail: "Board of Intermediate Education Karachi (BIEK).",
    period: "2021",
  },
  {
    id: "ssc",
    credential: "Secondary School Certificate",
    field: "Science",
    school: "Hayat-ul-Islam Public School, Gulshan-e-Iqbal, Karachi",
    detail: "Board of Secondary Education Karachi (BSEK).",
    period: "2019",
  },
];
