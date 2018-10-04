export declare function getScrollPosition(scrollLeft: number, scrollTop: number, { scrollWidth, scrollHeight, clientWidth, clientHeight, }: {
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
}): {
    scrollLeft: number;
    scrollTop: number;
    endOfScrollTop: boolean;
    endOfScrollLeft: boolean;
};
export default getScrollPosition;
