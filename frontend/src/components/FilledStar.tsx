const FilledStar = ({ size = 5 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="gold"
    className={`w-${size} h-${size} cursor-pointer`}
  >
    <path d="M12 .587l3.668 7.429L24 9.753l-6 5.839 1.415 8.248L12 19.812l-7.415 3.978L6 15.592 0 9.753l8.332-1.737L12 .587z" />
  </svg>
);

export default FilledStar;
