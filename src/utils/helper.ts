export const formatToMillion = function (number: number): string {
  if (isNaN(number)) {
    throw new Error("Input must be a number");
  }

  // Convert the number to millions
  const numberInMillions = number / 1_000_000;

  // Format the number with commas and two decimal places
  const formattedNumber = numberInMillions.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formattedNumber}M`;
};

export function roundToThreeDecimalPlaces(
  number: number | string | null | undefined
): string {
  if (number === null || number === undefined) {
    throw new Error(
      "Input must be a valid number or a string representing a number"
    );
  }

  const num = typeof number === "string" ? parseFloat(number) : number;

  if (isNaN(num)) {
    throw new Error(
      "Input must be a valid number or a string representing a number"
    );
  }

  // Round the number to three decimal places
  return num.toFixed(3);
}
