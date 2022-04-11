export interface User {
     id: number,
     name: string,
     username: string,
     email: string,
     address: address
     phone: string,
     website: string,
     companyName: string
}

interface address {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
}
