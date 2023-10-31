let _debounceTimeout = null,
    _throttleRunning = false


/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn, delay = 500) => {
    clearTimeout(_debounceTimeout);
    _debounceTimeout = setTimeout(() => {
        fn();
    }, delay);
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
    if (_throttleRunning) {
        return;
    }
    _throttleRunning = true;
    fn();
    setTimeout(() => {
        _throttleRunning = false;
    }, delay);
}

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param timeStamp
 * @param {String} format Y-m-d H:i:s
 * @return {String}
 */
export const format_date = (timeStamp, format = 'Y-m-d H:i:s') => {
    if (!timeStamp) return ''
    if (timeStamp.toString().length === 10) {
        timeStamp = +timeStamp * 1000;
    } else {
        timeStamp = +timeStamp;
    }
    let _date = new Date(timeStamp),
        Y = _date.getFullYear(),
        m = _date.getMonth() + 1,
        d = _date.getDate(),
        H = _date.getHours(),
        i = _date.getMinutes(),
        s = _date.getSeconds();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    H = H < 10 ? '0' + H : H;
    i = i < 10 ? '0' + i : i;
    s = s < 10 ? '0' + s : s;

    return format.replace(/[YmdHis]/g, key => {
        return {
            Y,
            m,
            d,
            H,
            i,
            s
        } [key];
    });
}


/**
 * 修改分页参数
 * @param params
 * @param pageLabel
 * @param sizeLabel
 * @returns {*}
 */
export const wrapPage = (params, pageLabel = 'pageNum', sizeLabel = 'pageSize') => {
    if (pageLabel !== "pageNum" && params['pageNum']) {
        params[pageLabel] = params['pageNum']
        delete params['pageNum']
    }
    if (sizeLabel !== "pageSize" && params['pageSize']) {
        params[sizeLabel] = params['pageSize']
        delete params['pageSize']
    }
    return params
}


export default function getUuid() {// 默认M为4
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0; // 取整
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString();
    });
}

/**
 * 数字区间随机数
 * @param min 最小值
 * @param max 最大值
 */
export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 筛选列转对象
 * @param options
 */
export const optionsToObj = (options = []) => {
    const obj = {}
    options.map(item => {
        obj[item.value] = item.label
    })
    return obj
}

/**
 * 数组转字母
 * @param number
 */
export const numberToChar = (number) => {
    return String.fromCharCode(Number(number) + 64);
}

/**
 * 转表单数据
 * @param obj
 * @returns {FormData}
 */
export const objToFormData = (obj) => {
    const formData = new FormData()
    Object.keys(obj).map(key => {
        formData.append(key, obj[key])
    })
    return formData
}


export const getWeekDays = () => {
    const weekDays = []
    let currentStamp = new Date().valueOf()
    for (let i = 0; i < 7; i++) {
        const temp = format_date(currentStamp, 'm.d')
        weekDays.push(temp)
        currentStamp = currentStamp - 1000 * 60 * 60 * 24
    }
    return weekDays.reverse()
}

// 格式转换
export const strToArr = (str, formItemName) => {
    if(str){
        const list = str.split(',')
        let obj = {}
        obj[formItemName] = list.map(item => {
            const itemList = item.split('-')
            return {
                name: itemList[0],
                num: itemList[1]
            }
        })
        return obj
    }
}