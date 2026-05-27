// server/api/classes.ts
export default defineEventHandler(async (event) => {
  const yogaClasses = [
    { id: 1, title: "Vinyasa Flow Flow", level: "Intermédiaire", duration: "45min" },
    { id: 2, title: "Hatha Yoga", level: "Tous niveaux", duration: "60min" }
  ];

  return {
    success: true,
    data: yogaClasses
  };
});