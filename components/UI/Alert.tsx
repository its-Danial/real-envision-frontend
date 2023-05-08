import { FC, SetStateAction, memo, useState } from "react";

type AlertProps = {
  message: string;
  type: "info" | "success" | "warning" | "error";
  show: boolean;
  onHideClick: () => void;
};

const Alert: FC<AlertProps> = memo(({ message, type, show, onHideClick }) => {
  const getAlertStyle = () => {
    switch (type) {
      case "info":
        return ["alert-info", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"];
      case "success":
        return ["alert-success", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"];
      case "warning":
        return [
          "alert-warning",
          "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
        ];
      case "error":
        return ["alert-warning", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"];
      default:
        break;
    }
  };
  return (
    <>
      {show ? (
        <div className={`fixed z-50 top-2 w-full flex justify-center items-center`}>
          <div className={`mx-8 alert shadow-lg ${getAlertStyle()?.at(0)}`}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getAlertStyle()?.at(1)}></path>
              </svg>
              <span>{message}</span>
            </div>
            <div className="flex-none">
              <button onClick={onHideClick} className="btn btn-sm btn-outline normal-case">
                Hide
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

Alert.displayName = "Alert";
export default Alert;
