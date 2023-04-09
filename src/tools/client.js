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


    // Init client
    
    // Helper Functions
    async getAccount() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/users`, requestOptions);
        const res = await account.json();

        return res;
    }

    async getViews() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/visits`, requestOptions);
        const res = await account.json();

        return res;
    }
}