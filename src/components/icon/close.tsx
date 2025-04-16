interface SvgIconProps {
  className?: string;
}

const SvgIcon = ({ className }: SvgIconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path
      stroke="#232323"
      strokeWidth="3"
      d="M6.586 29.213 29.213 6.586M34 18c0 8.837-7.163 16-16 16S2 26.837 2 18 9.163 2 18 2s16 7.163 16 16Z"
    ></path>
  </svg>
);

export default SvgIcon;
