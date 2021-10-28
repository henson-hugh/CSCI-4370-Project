export class Customer {
    id: number = 0;
    firstName: string = '';
    lastName: string = ''; 
    email: string = '';
    phone: string = '';
    password: string = ''; 
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    paymentCard: string = '';
    expDate: string= '';
    active: boolean = false;
    type: string = '';
    verificationCode: string = '';
    getPromo: boolean = false;
    
    constructor(){}
}