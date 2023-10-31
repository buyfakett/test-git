import service from "@/service";


export function refresh_push() {
    return service({
        method:'GET',
        url: '/push/refresh',
    })
}

export function get_push(params) {
    return service({
        method:'GET',
        url: '/push/view',
        params
    })
}

export function change_push(data) {
    return service({
        method: 'PUT',
        url: '/push/edit',
        data
    })
}

export function add_push(data) {
    return service({
        method: 'POST',
        url: '/push/add',
        data
    })
}