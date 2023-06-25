import Button from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import Typography from "@/components/ui/typography";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Portal from "../portal";

type Props = {
  children?: ReactNode;
  footer?: ReactNode;
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
};

const Modal = ({ title, isOpen, onClose, footer, children }: Props) => {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="flex overflow-y-scroll fixed z-50 justify-center items-center p-3 w-screen h-screen bg-opacity-40 bg-slate-900"
          >
            <motion.div
              initial={{
                translateY: 100,
              }}
              animate={{
                translateY: 0,
              }}
              exit={{
                opacity: 0,
                translateY: 100,
              }}
              onClick={(e) => e.stopPropagation()}
              className="overflow-y-scroll max-w-4xl bg-white rounded-xl shadow max-h-[97vh] min-w-[296px]"
            >
              <header className="flex gap-3 justify-between items-center py-1 pr-3 pl-8">
                <Typography
                  tag="h3"
                  variant="text2"
                  className="font-semibold text-slate-600"
                  customColor
                >
                  {title}
                </Typography>
                <Button variant="tertiary" onClick={onClose} onlyIcon>
                  <Icons.close />
                </Button>
              </header>
              <main className="py-3 px-8">{children}</main>
              {footer && (
                <footer className="flex gap-2 justify-end items-center py-3 px-8">
                  {footer}
                </footer>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
