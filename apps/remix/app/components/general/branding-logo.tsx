import type { SVGAttributes } from 'react';

export type LogoProps = SVGAttributes<SVGSVGElement>;

export const BrandingLogo = ({ ...props }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      fill="none"
      {...props}
    >
      <text
        x="0"
        y="28"
        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
        fontWeight="bold"
        fontSize="32"
        fill="currentColor"
        letterSpacing="2"
      >
        Signflow
      </text>
    </svg>
  );
};
