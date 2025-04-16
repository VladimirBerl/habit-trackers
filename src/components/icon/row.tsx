interface SvgIconProps {
  className?: string;
}

const SvgIcon = ({ className }: SvgIconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22.57 3.43a1.47 1.47 0 0 0-2.08 0L9.46 14.46a1.47 1.47 0 0 0 0 2.08l11.03 11.03a1.47 1.47 0 0 0 2.08-2.08l-9.99-9.99 9.99-9.99a1.47 1.47 0 0 0 0-2.08"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default SvgIcon;
