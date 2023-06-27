import Check from "./check.svg";
import Settings from "./settings.svg";
import ArrowDown from "./arrow-down.svg";
import ButtonLoading from "./button-loading.svg";
import ButtonLoadingPrimary from "./button-loading-primary.svg";
import ButtonLoadingOnlyIcon from "./button-loading-only-icon.svg";
import ButtonLoadingPrimaryOnlyIcon from "./button-loading-primary-only-icon.svg";
import Checkbox from "./checkbox.svg";
import Eye from "./eye.svg";
import EyeOff from "./eye-off.svg";
import NotifySuccess from "./notify-success.svg";
import NotifyError from "./notify-error.svg";
import Close from "./close.svg";
import Menu from "./menu.svg";

type ButtonLoadingProps = {
  primary?: boolean;
  onlyIcon?: boolean;
};

const Icons = {
  check: () => <Check />,
  settings: () => <Settings />,
  arrowDown: () => <ArrowDown />,
  ButtonLoading: ({ primary = true, onlyIcon = false }: ButtonLoadingProps) => {
    if (onlyIcon) {
      if (primary)
        return <ButtonLoadingPrimaryOnlyIcon className="animate-spin" />;
      return <ButtonLoadingOnlyIcon className="animate-spin" />;
    } else {
      if (primary) return <ButtonLoadingPrimary className="animate-spin" />;
      return <ButtonLoading className="animate-spin" />;
    }
  },
  checkbox: () => <Checkbox />,
  eye: () => <Eye />,
  eyeOff: () => <EyeOff />,
  notifySuccess: () => <NotifySuccess />,
  notifyError: () => <NotifyError />,
  close: () => <Close />,
  menu: () => <Menu />,
};

export default Icons;
