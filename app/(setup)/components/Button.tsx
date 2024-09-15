interface ButtonProps {
  name: string;
  containerClass: any;
  isBeam: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  isBeam = false,
  containerClass,
}) => {
  return (
    <button className={`btn ${containerClass}`}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="btn-ping"></span>
          <span className="btn-ping_dot"></span>
        </span>
      )}
      {name}
    </button>
  );
};

export default Button;
