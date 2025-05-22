type props = {
  path: string;
  alt: string;
  className?: string;
};
const OptimizedImage = ({ alt, path, className }: props) => {
  return <img src={path} alt={alt} loading="lazy" className={className} />;
};

export default OptimizedImage;
