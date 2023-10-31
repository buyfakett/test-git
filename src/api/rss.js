import service from "@/service";


export function rss_list(params) {
    return service({
        method:'GET',
        url: '/rss/list',
        params
    })
}

export function delete_rss(data) {
    return service({
        method:'DELETE',
        url: '/rss/delete',
        data
    })
}

export function rss(method, data) {
    let url = ''
    if(method === 'POST') {
        url = '/rss/add'
    }else if(method === 'PUT'){
        url = '/rss/edit'
    }
    return service({
        method: method,
        url: url,
        data
    })
}