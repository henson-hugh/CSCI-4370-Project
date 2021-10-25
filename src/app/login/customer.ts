class Customer {
    id: number;
    firstName: string;
    lastName: string; 
    email: string;
    password: string; 
    address: string
    
    constructor(id: number, firstName: string, lastName: string, email: string, password: string, address: string) { 
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
    }
}