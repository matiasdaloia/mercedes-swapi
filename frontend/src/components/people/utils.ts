export const getGenderIcon = (gender: string) => {
  switch (gender.toLowerCase()) {
    case "male":
      return "♂️";
    case "female":
      return "♀️";
    case "hermaphrodite":
      return "⚧️";
    case "none":
      return "🤖";
    case "n/a":
      return "🤖";
    default:
      return "❓";
  }
};
