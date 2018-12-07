export interface IMousePosition {
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
}
export type MouseEventSubscribeCallbackFn = (mpos: IMousePosition) => void;

const mouseEventSubscribe = (
  callBack: MouseEventSubscribeCallbackFn,
  onEnd: () => void
) => {
  const onMousemoveWindow = (e: MouseEvent) => {
    callBack({
      pageX: e.pageX,
      pageY: e.pageY,
      clientX: e.clientX,
      clientY: e.clientY
    });
  };

  window.addEventListener("mousemove", onMousemoveWindow, false);
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", onMousemoveWindow);
    if (onEnd) {
      onEnd();
    }
  });
};

export default mouseEventSubscribe;
