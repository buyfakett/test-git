import service from "@/service";


export function login(data){
    return service({
        method:'POST',
        url: '/user/login',
        data
    })
}

export function reset_passwd(data){
    return service({
        method:'PUT',
        url: '/user/reset',
        data
    })
}

export function register(data){
    return service({
        method:'POST',
        url: '/user/register',
        data
    })
}