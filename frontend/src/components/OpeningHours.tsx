const openingHours = {
  Hétfő: "08:00 - 18:00",
  Kedd: "08:00 - 18:00",
  Szerda: "08:00 - 18:00",
  Csütörtök: "08:00 - 18:00",
  Péntek: "08:00 - 20:00",
  Szombat: "09:00 - 14:00",
  Vasárnap: "Zárva",
};

export const OpeningHours = () => {
  return (
    <>
      {Object.entries(openingHours).map(([day, hours]) => (
        <div key={day} className="flex flex-1 justify-between">
          <span className="font-bold">{day}</span>
          <span>{hours}</span>
        </div>
      ))}
    </>
  );
};
