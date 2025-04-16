interface SvgIconProps {
  className?: string;
}

const SvgIcon = ({ className }: SvgIconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      fill="#31D158"
      fillRule="evenodd"
      d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m.9-16a.9.9 0 1 0-1.8 0v4.1H7a.9.9 0 1 0 0 1.8h4.1V17a.9.9 0 1 0 1.8 0v-4.1H17a.9.9 0 1 0 0-1.8h-4.1z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default SvgIcon;
