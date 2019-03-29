export declare namespace DataGridEnums {
    enum EventNames {
        WHEEL = "wheel",
        KEYDOWN = "keydown",
        KEYUP = "keyup",
        MOUSEDOWN = "mousedown",
        MOUSEUP = "mouseup",
        CLICK = "click",
        TOUCHSTART = "touchStart",
        BLUR = "blur",
        CONTEXTMENU = "contextmenu"
    }
    enum KeyCodes {
        BACKSPACE = 8,
        ENTER = 13,
        TAB = 9,
        SHIFT = 16,
        CTRL = 17,
        ALT = 18,
        ESC = 27,
        SPACE = 32,
        PAGE_UP = 33,
        PAGE_DOWN = 34,
        END = 35,
        HOME = 36,
        LEFT_ARROW = 37,
        UP_ARROW = 38,
        RIGHT_ARROW = 39,
        DOWN_ARROW = 40
    }
    enum MetaKeycodes {
        A = 65,
        B = 66,
        C = 67
    }
    enum ScrollTypes {
        HORIZONTAL = 0,
        VERTICAL = 1
    }
    enum DirectionTypes {
        LEFT = 0,
        RIGHT = 1,
        UP = 2,
        DOWN = 3
    }
    enum DispatchTypes {
        SORT = 0,
        FILTER = 1,
        UPDATE = 2,
        UPDATE_ITEM = 3,
        RESIZE_COL = 4,
        SELECT = 5,
        SELECT_ALL = 6,
        CHANGE_SELECTION = 7,
        FOCUS_ROOT = 8
    }
    enum PageButtonActions {
        PAGE_FIRST = "PAGE_FIRST",
        PAGE_PREV = "PAGE_PREV",
        PAGE_BACK = "PAGE_BACK",
        PAGE_PLAY = "PAGE_PLAY",
        PAGE_NEXT = "PAGE_NEXT",
        PAGE_LAST = "PAGE_LAST"
    }
    enum PanelNames {
        TOP_ASIDE_BODY_SCROLL = "top-aside-body-scroll",
        TOP_LEFT_BODY_SCROLL = "top-left-body-scroll",
        TOP_BODY_SCROLL = "top-body-scroll",
        ASIDE_BODY_SCROLL = "aside-body-scroll",
        LEFT_BODY_SCROLL = "left-body-scroll",
        BODY_SCROLL = "body-scroll",
        BOTTOM_ASIDE_BODY_SCROLL = "bottom-aside-body-scroll",
        BOTTOM_LEFT_BODY_SCROLL = "bottom-left-body-scroll",
        BOTTOM_BODY_SCROLL = "bottom-body-scroll",
        ASIDE_HEADER = "aside-header",
        LEFT_HEADER = "left-header",
        HEADER_SCROLL = "header-scroll"
    }
}
