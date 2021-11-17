export class Customer {
    cid: number = 0;
    userid: number;
    firstName: string = '';
    lastName: string = ''; 
    phone: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    active: boolean = false;
    getPromo: boolean = false;
    
    constructor(){}
}