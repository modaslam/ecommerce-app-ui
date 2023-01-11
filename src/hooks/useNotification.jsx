import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

const TIMEOUT = 3000;

const showSuccessNotification = (title = "", message = "") =>
  showNotification({
    autoClose: TIMEOUT,
    title: title,
    message: message,
    color: "teal",
    icon: <IconCheck size={18} />,
  });

const showErrorNotification = (message = "") => {
  showNotification({
    autoClose: TIMEOUT,
    message: message,
    color: "red",
    icon: <IconX size={18} />,
  });
};

const showLoadingNotification = (title = "", message = "", loading) =>
  showNotification({
    autoClose: TIMEOUT,
    title: title,
    message: message,
    loading: loading,
    disallowClose: true,
  });

export const useNotification = ({
  type,
  title,
  message,
  loading = false,
  color = "",
  icon,
}) => {
  switch (type) {
    case "success":
      showSuccessNotification(title, message);
      break;
    case "error":
      showErrorNotification(message);
      break;
    case "loading":
      showLoadingNotification(title, message, loading);
      break;
    default:
      showNotification({
        autoClose: TIMEOUT,
        title: title,
        message: message,
        color: color,
        icon: icon,
        loading: loading,
      });
  }
};
