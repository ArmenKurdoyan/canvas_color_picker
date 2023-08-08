const header = document.getElementById(
  "picked_color_value"
) as HTMLInputElement;

interface displayPickedColorProps {
  color: string;
}

/**
 * Is this now TypeScript ?
 * I used interface to describe amazingly simple prop.
 * Does it count now ?
 */

export function displayPickedColor(props: displayPickedColorProps) {
  const { color } = props;
  header.value = color;
}
