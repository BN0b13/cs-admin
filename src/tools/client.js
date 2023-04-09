import { 
    api,
    tokenName
} from '../config';

export default class Client {
    token = localStorage.getItem(tokenName);

    // Headers -> put token in bearer auth headers

    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`);
    // myHeaders.append("Accept", "Bearer application/json");
    // myHeaders.append("Content-Type", "application/json");

    // const requestOptions = {
    // method: 'GET',
    // headers: myHeaders
    // };

    // fetch("http://localhost:8050/inventory", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));


    // Init client
    
    // Helper Functions
    async getAccount() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);
        myHeaders.append("Accept", "Bearer application/json");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
        method: 'GET',
        headers: myHeaders
        };
        
        const account = await fetch(`${api}/users`, requestOptions);
          
        const res = await account.json();

        return res;
    }
}