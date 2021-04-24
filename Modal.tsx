import * as React from "react";
import * as ReactDOM from "react-dom";

type ModalProps = {
  setModalComponent: (component: React.ReactElement | null) => void;
  modalComponent: React.ReactElement | null;
};

type InitialValue = ModalProps;

const initialValue: InitialValue = {
  setModalComponent: () => {},
  modalComponent: null,
};

const ModalContext = React.createContext(initialValue);

type ModalProvider = {
  children: React.ReactNode;
};

const ModalProvider: React.FC<ModalProvider> = ({ children }) => {
  const [
    modalComponent,
    setModalComponent,
  ] = React.useState<React.ReactElement | null>(null);
  return (
    <ModalContext.Provider
      value={{
        modalComponent,
        setModalComponent,
      }}
    >
      {children}
      <ModalComponent modalComponent={modalComponent} />
    </ModalContext.Provider>
  );
};
const useModal = () => React.useContext(ModalContext);

type ModalComponentProps = {
  modalComponent: ModalProps["modalComponent"];
};

function isDefined<T>(value: T | undefined | null): value is T {
  return typeof value !== "undefined" && value !== null;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ modalComponent }) => {
  const ref = React.useRef<HTMLElement | null>();

  React.useEffect(() => {
    ref.current = document.body;
    return () => {
      ref.current = null;
    };
  }, []);

  if (isDefined(ref.current) && React.isValidElement(modalComponent)) {
    return ReactDOM.createPortal(modalComponent, ref.current);
  }

  return null;
};

export { ModalComponent, ModalProvider, useModal };
