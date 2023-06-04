import Check from "./check.svg";
import Settings from "./settings.svg";
import ArrowDown from "./arrow-down.svg";
import ButtonLoading from "./button-loading.svg";
import ButtonLoadingPrimary from "./button-loading-primary.svg";
import ButtonLoadingOnlyIcon from "./button-loading-only-icon.svg";
import ButtonLoadingPrimaryOnlyIcon from "./button-loading-primary-only-icon.svg";
import Checkbox from "./checkbox.svg";

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
};

export default Icons;
