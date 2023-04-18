import { FC, memo } from "react";

type AlertProps = {
  message: string;
  type: "info" | "success" | "warning" | "error";
};

const Alert: FC<AlertProps> = memo(({ message, type }) => {
  const getAlertColor = () => {
    switch (type) {
      case "info":
        return "alert-info";
      case "success":
        return "alert-success";
      case "warning":
        return "alert-warning";
      case "error":
        return "alert-warning";
      default:
        break;
    }
  };
  const getAlertIconD = () => {
    switch (type) {
      case "info":
        return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
      case "success":
        return "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
      case "warning":
        return "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z";
      case "error":
        return "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";
      default:
        break;
    }
  };

  return (
    <div className="fixed top-2 w-full flex justify-center items-center">
      <div className={`mx-8 alert shadow-lg ${getAlertColor()}`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getAlertIconD()}></path>
          </svg>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
});

Alert.displayName = "Alert";
export default Alert;
