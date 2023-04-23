import { FC } from "react";
import { RiUpload2Line } from "react-icons/ri";

type SettingsAvatarProps = {
  image: string;
  onChange: (value: string) => void;
};

const SettingsAvatar: FC<SettingsAvatarProps> = ({ image, onChange }) => {
  const imageUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    // onChange(URL.createObjectURL(event.target.files[0]));
    const selectedFile = event.target.files;
    if (selectedFile.length > 0) {
      const [imageFile] = selectedFile;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        console.log("base64:", srcData);
        onChange(srcData as string);
      };
      fileReader.readAsDataURL(imageFile);
    }
  };

  return (
    <div className="indicator mx-auto">
      <span className="indicator-item indicator-bottom right-5 bottom-3 w-[40px] h-[40px] rounded-full flex cursor-pointer">
        <label className="glass w-[40px] h-[40px] rounded-full relative cursor-pointer">
          <RiUpload2Line className="text-base-content absolute left-[10px] top-[9px] cursor-pointer" size={20} />
          <input
            type="file"
            accept=".jpeg, .png, .jpg"
            className="invisible w-[40px] h-[40px] rounded-full cursor-pointer"
            onChange={imageUploadHandler}
          />
        </label>
      </span>
      <div className="avatar">
        <div className="w-28 rounded-full indicator">
          <img src={image} />
        </div>
      </div>
    </div>
  );
};
export default SettingsAvatar;
