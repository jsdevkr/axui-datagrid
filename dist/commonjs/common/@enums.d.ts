export declare namespace DataGridEnums {
    enum EventNames {
        'WHEEL' = "wheel",
        'KEYDOWN' = "keydown",
        'KEYUP' = "keyup",
        'MOUSEDOWN' = "mousedown",
        'MOUSEUP' = "mouseup",
        'CLICK' = "click",
        'TOUCHSTART' = "touchStart",
        'BLUR' = "blur",
        'CONTEXTMENU' = "contextmenu"
    }
    enum KeyCodes {
        'BACKSPACE' = 8,
        'ENTER' = 13,
        'TAB' = 9,
        'SHIFT' = 16,
        'CTRL' = 17,
        'ALT' = 18,
        'ESC' = 27,
        'SPACE' = 32,
        'PAGE_UP' = 33,
        'PAGE_DOWN' = 34,
        'END' = 35,
        'HOME' = 36,
        'LEFT_ARROW' = 37,
        'UP_ARROW' = 38,
        'RIGHT_ARROW' = 39,
        'DOWN_ARROW' = 40,
        'A' = 65,
        'B' = 66,
        'C' = 67
    }
    enum ScrollTypes {
        'HORIZONTAL' = 0,
        'VERTICAL' = 1
    }
    enum DirectionTypes {
        'LEFT' = 0,
        'RIGHT' = 1,
        'UP' = 2,
        'DOWN' = 3
    }
    enum DispatchTypes {
        'SET_DATA' = 0,
        'SORT' = 1,
        'FILTER' = 2,
        'UPDATE' = 3,
        'RESIZE_COL' = 4,
        'SELECT' = 5,
        'SELECT_ALL' = 6,
        'CHANGE_SELECTION' = 7
    }
    enum PageButtonActions {
        'PAGE_FIRST' = "PAGE_FIRST",
        'PAGE_PREV' = "PAGE_PREV",
        'PAGE_BACK' = "PAGE_BACK",
        'PAGE_PLAY' = "PAGE_PLAY",
        'PAGE_NEXT' = "PAGE_NEXT",
        'PAGE_LAST' = "PAGE_LAST"
    }
}
