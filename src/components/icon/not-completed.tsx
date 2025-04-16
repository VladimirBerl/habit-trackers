interface SvgIconProps {
  className?: string;
}

const SvgIcon = ({ className }: SvgIconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path
      stroke="#232323"
      strokeWidth="2"
      d="M6.866 21.008 21.008 6.866M24 14c0 5.523-4.477 10-10 10S4 19.523 4 14 8.477 4 14 4s10 4.477 10 10Z"
    ></path>
  </svg>
);

export default SvgIcon;
