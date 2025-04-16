interface SvgIconProps {
  className?: string;
}

const SvgIcon = ({ className }: SvgIconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 12 12"
  >
    <path
      fill="#fff"
      d="M10.78.902a1 1 0 0 1 .318 1.378l-5.625 9a1 1 0 0 1-1.622.103L.476 7.258a1 1 0 0 1 1.548-1.266l2.492 3.046L9.402 1.22A1 1 0 0 1 10.78.902"
    ></path>
  </svg>
);

export default SvgIcon;
