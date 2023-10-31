// 手机号验证
export function phonerule(rule, value, callback) {
    let reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    if (value.length === 0) {
        callback(new Error('请输入手机号'))
    } else if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
    } else {
        callback()
    }
}

// 密码验证
export function passrule(rule, value, callback) {
    let pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (value.length === 0) {
        callback(new Error('请输入密码'))
    }
    else if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度为6-16位'))
    } else if (!pass.test(value)) {
        callback(new Error('密码格式不正确'))
    }
    else {
        callback()
    }
}
