import { 
    api,
    tokenName
} from '../config';

export default class Client {
    token = localStorage.getItem(tokenName);
    fetchMethods = {
        get: 'GET',
        post: 'POST',
        patch: 'PATCH',
        delete: 'DELETE'
    }
    
    fetchOptions(method, body = null, withToken = false) {
        const headers = new Headers();
        if(withToken) {
            headers.append("Authorization", `Bearer ${this.token}`);
        }
        headers.append("Accept", "Bearer application/json");
        headers.append("Content-Type", "application/json");

        if(body) {
            return {
                method,
                headers,
                body
            };
        }

        return {
            method,
            headers
        }   
    }

    // Accounts

    async getAccounts() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/accounts`, requestOptions);
        const res = await account.json();

        return res;
    }

    // Orders

    async getOrders() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/orders`, requestOptions);
        const res = await account.json();

        return res;
    }

    // Products

    async getProducts() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '');
        const account = await fetch(`${api}/products`, requestOptions);
        const res = await account.json();

        return res;
    }

    // Views

    async getViews() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/visits`, requestOptions);
        const res = await account.json();

        return res;
    }
}