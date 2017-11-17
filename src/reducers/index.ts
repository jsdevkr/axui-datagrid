import * as act from '../actions';
import {List, Map} from 'immutable';
import {isObject} from 'lodash';

export interface State {
    receivedList: any;
    deletedList: any;
    list: any;
    page: object;
    sortInfo: object;
    selectedRowList: any;
    selectedColumns: any;
    focusedPosition: any;
}

// 초기 상태
const initialState = Map({
    receivedList: List([]),
    deletedList: List([]),
    list: List([]),
    page: Map({}),
    sortInfo: Map({}),
    selectedRowList: {},
    selectedColumns: {},
    focusedPosition: {
        r: 0, c: 0
    }
});

// 리듀서 함수 정의
export const gridReducer = (state = initialState, action) => {
    const processor = {
        [act.INIT]: () => { // 그리드 데이터 초기화

            let list; // 그리드에 표현할 목록

            // 전달받은 리스트 중에 출력할 리스트를 필터링
            list = action.receivedList.filter(function (item) {
                if (item) {
                    if (item[action.options.columnKeys.deleted]) {
                        return false;
                    } else {
                        return true;
                    }
                }
                return false;
            });

            return state
                .set('receivedList', List(action.receivedList))
                .set('list', List(list))
                .set('page', isObject(action.page) ? Map(action.page) : false);
        },

        [act.SET_DATA]: () => {
            // 전달받은 리스트 중에 출력할 리스트를 필터링
            let list = action.receivedList.filter(function (item) {
                if (item) {
                    if (item[action.options.columnKeys.deleted]) {
                        return false;
                    } else {
                        return true;
                    }
                }
                return false;
            });

            list = List(list);

            return state
                .set('receivedList', List(action.receivedList))
                .set('list', list)
                .set('page', isObject(action.page) ? Map(action.page) : false)
        }
    };

    if (action.type in processor) {
        return processor[action.type]();
    } else {
        return state;
    }
};