// import create from 'zustand'
// export const configStore = create((set) => ({
//     config: {
//         category: null,
//         role: null,
//         customer: null,
//     },
//     setConfig: (params) =>
//         set((status) => ({
//             config: params,
//             ...status
//         }))
// }))


import { create } from "zustand"; // global state

export const configStore = create((set) => ({
    config: {
        category: null,
        role: null,
        supplier: null,
        purchase_status: null,
        brand: null,
        customer: null,
    },
    setConfig: (params) =>
        set((state) => ({
            config:params,
            ...state
        })),
    // setConfig: (params) =>
    //     set((status) => ({
    //         config: params,
    //     })),
    
}));
