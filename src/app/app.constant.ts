export const AppConstant = Object.freeze({

    API_ENDPOINT: "http://planner-api.elysiantcp.com/",
    // API_ENDPOINT:"http://localhost:7020/",
    API_URL: {
        LOGIN: "api/Authenticate/login",
        UNIT: 'api/Production/GetUnit',
        SHAPE: 'api/Production/GetShapes',
        CUSTOMER: 'api/Customer/GetCustomerlist',
        CATEGORY: 'api/Model/GetCategory',
        MASTER: {
            MODEL: {
                GET: "api/Model/GetModel",
                CREATE: "api/Model/Create",
                UPDATE: "api/Model/Update",
                VIEW: "api/Model/EditModel",
                DELETE: "api/Model/UpdateStatus",
            },
            CUSTOMER: {
                GET: "api/Customer/GetCustomer",
                CREATE: "api/Customer/Create",
                UPDATE: "api/Customer/Update",
                VIEW: "api/Customer/EditCustomer",
                DELETE: "api/Customer/UpdateStatus",
                CATEGORY: "api/Customer/GetCategory",
                COUNTRY: "api/Customer/GetCountry"
            }
        },
        PRODUCTION: {
            GETMODELS: "api/Production/GetModel",
            LIST: "api/Production/GetBinList",
            SAVE: "api/Production/Create",
            TYPETWO: {
                GETMODELS: ""
            }
        }
    },

    firebaseConfig: {
        apiKey: "AIzaSyCEkMBmueHF6N1nZkLBed-DNtB5fPS-a4U",
        authDomain: "ignite052026.firebaseapp.com",
        projectId: "ignite052026",
        storageBucket: "ignite052026.firebasestorage.app",
        messagingSenderId: "149038346932",
        appId: "1:149038346932:web:eb18de8614f41ac2199de1",
        measurementId: "G-T1JB2FVEVG"
    },
    planStatusLists: [
        { name: 'Pending', id: 1 },
        { name: 'In Progress', id: 2 },
        { name: 'Completed', id: 3 },
        { name: 'Cancelled', id: 4 }
    ],
    closingStatusLists: [
        { name: 'Grip', id: 1 },
        { name: 'Possiable', id: 2},
        { name: 'Follow', id: 3 },
        { name: 'Completed', id: 4 },
        { name: 'KIV', id: 5 },
        { name: 'Not Interested', id: 6 },
         { name: 'Plan Over', id: 0 },
    ]
})