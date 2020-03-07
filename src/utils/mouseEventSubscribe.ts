import { throttle } from 'axui-datagrid/utils';

export interface IMousePosition {
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
}
export type MouseEventSubscribeCallbackFn = (mpos: IMousePosition) => void;

const mouseEventSubscribe = (
  callBack: MouseEventSubscribeCallbackFn,
  onEnd: () => void,
) => {
  const throttledCallBack = throttle((e: MouseEvent) => {
    callBack({
      pageX: e.pageX,
      pageY: e.pageY,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  }, 100);

  const onMousemoveWindow = (e: MouseEvent) => {
    throttledCallBack(e);
  };

  window.addEventListener('mousemove', onMousemoveWindow, false);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', onMousemoveWindow);
    if (onEnd) {
      onEnd();
    }
  });
};

export default mouseEventSubscribe;
