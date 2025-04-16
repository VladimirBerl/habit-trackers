interface SvgIconProps {
  className?: string;
}

const SvgIcon = ({ className }: SvgIconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path
      fill="#31D158"
      fillRule="evenodd"
      d="M24.664 6.21a.99.99 0 0 1 .024 1.399L11.386 21.392a.99.99 0 0 1-1.423 0L3.312 14.5a.99.99 0 1 1 1.423-1.374l5.94 6.155 12.59-13.046a.99.99 0 0 1 1.399-.025"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default SvgIcon;
