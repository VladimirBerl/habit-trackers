interface SvgIconProps {
  className?: string;
}

const SvgIcon = ({ className }: SvgIconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      fill="#007AFF"
      fillRule="evenodd"
      d="M9.9 21.9A.9.9 0 0 1 9 21v-9a.9.9 0 1 1 1.8 0v9a.9.9 0 0 1-.9.9m4 0a.9.9 0 0 1-.9-.9V8a.9.9 0 1 1 1.8 0v13a.9.9 0 0 1-.9.9m4 0a.9.9 0 0 1-.9-.9V3a.9.9 0 1 1 1.8 0v18a.9.9 0 0 1-.9.9M5.9 21.9A.9.9 0 0 1 5 21v-5a.9.9 0 1 1 1.8 0v5a.9.9 0 0 1-.9.9"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default SvgIcon;
