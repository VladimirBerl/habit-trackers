interface SvgIconProps {
  className?: string;
}

const SvgIcon = ({ className }: SvgIconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.306 5.231a1 1 0 0 1 1.414-.009l7.282 7.186 7.282-7.186a1 1 0 0 1 1.405 1.424l-7.263 7.167 7.263 7.168a1 1 0 0 1-1.405 1.423l-7.282-7.186-7.282 7.186a1 1 0 0 1-1.405-1.423l7.263-7.168-7.263-7.167a1 1 0 0 1-.01-1.415"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default SvgIcon;
