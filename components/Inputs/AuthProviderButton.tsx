import { FC } from "react";

type AuthProviderButtonProps = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

const AuthProviderButton: FC<AuthProviderButtonProps> = ({ label, onClick, icon }) => {
  return (
    <button className="btn btn-primary gap-4 w-full normal-case" onClick={onClick}>
      {icon}
      {label}
    </button>
  );
};
export default AuthProviderButton;
