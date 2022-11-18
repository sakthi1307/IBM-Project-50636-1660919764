import { Store } from "pullstate";


export const recordStore = new Store({
    records: [

    ],
})
export const billsStore = new Store({
    bills: [

    ],
})
export const dashboardStore = new Store({
    dashboardDetails: [

    ],
})

export const userStore = new Store({
    isLoggedIn: false,
    token: null,
    user: null,
})