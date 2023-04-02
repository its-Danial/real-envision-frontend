import { FC } from "react";
import { RiUpload2Line } from "react-icons/ri";

type SettingsAvatarProps = {};

const SettingsAvatar: FC<SettingsAvatarProps> = (props) => {
  return (
    <div className="indicator mx-auto">
      <span className="indicator-item indicator-bottom right-5 bottom-3">
        <button className="p-2 rounded-full glass">
          <RiUpload2Line className="text-base-content" size={20} />
        </button>
      </span>
      <div className="avatar">
        <div className="w-28 rounded-full indicator">
          <img src="https://avatars.githubusercontent.com/u/97651719?v=4" />
        </div>
      </div>
    </div>
  );
};
export default SettingsAvatar;
