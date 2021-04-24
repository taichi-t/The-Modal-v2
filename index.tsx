import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModalProvider, useModal } from "./Modal";

const ModalComponent = () => {
  const { setModalComponent } = useModal();
  return (
    <>
      <p>これはモーダルです</p>
      <button onClick={() => setModalComponent(null)}>モーダル閉じます</button>
    </>
  );
};

const Main = () => {
  const { setModalComponent } = useModal();
  return (
    <>
      <p>モーダルコンポーネントを表示したい↓</p>
      <button onClick={() => setModalComponent(<ModalComponent />)}>
        モーダル表示したい
      </button>
    </>
  );
};

ReactDOM.render(
  <ModalProvider>
    <Main />
  </ModalProvider>,
  document.getElementById("app")
);
