export const getClimateIcon = (climate: string) => {
  if (climate.includes("hot") || climate.includes("tropical")) return "🌞";
  if (
    climate.includes("cold") ||
    climate.includes("frozen") ||
    climate.includes("frigid")
  )
    return "❄️";
  if (climate.includes("temperate")) return "🌤️";
  if (climate.includes("arid") || climate.includes("desert")) return "🏜️";
  if (climate.includes("murky")) return "🌫️";
  if (climate.includes("humid")) return "💨";
  if (climate.includes("artificial")) return "🏭";
  return "🌍";
};

export function formatPopulation(population: string | number): string {
  if (population === "unknown" || population === "") {
    return "Unknown";
  }
  const num =
    typeof population === "string" ? parseInt(population, 10) : population;

  if (isNaN(num)) {
    return population.toString();
  }

  if (num >= 1_000_000_000_000) {
    return `${(num / 1_000_000_000_000).toFixed(1)}T`;
  } else if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K`;
  }

  return num.toLocaleString();
}

export const formatDiameter = (diameter: string) => {
  if (diameter === "unknown" || diameter === "0") return "Unknown";
  const num = parseInt(diameter);
  if (isNaN(num)) return diameter;
  return `${num.toLocaleString()} km`;
};
