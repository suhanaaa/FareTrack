export const findCheapestFlight = (flights) => {
  if (!flights) return null;

  return Object.entries(flights)
    .filter(([_, flight]) => flight && !flight.noFlights && flight.fare)
    .reduce((cheapest, [date, flight]) => {
      if (!cheapest || flight.fare < cheapest.flight.fare) {
        return { date, flight };
      }
      return cheapest;
    }, null);
};
