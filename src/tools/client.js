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
    
    fetchOptions(method, body = null, withToken = false, image = false) {
        let modifiedBody = JSON.stringify(body);
        const headers = new Headers();
        if(withToken) {
            headers.append("Authorization", `Bearer ${this.token}`);
        }
        if(image) {
            modifiedBody = body;
        } else {
            headers.append("Accept", "Bearer application/json");
            headers.append("Content-Type", "application/json");
        }

        if(body) {
            return {
                method,
                headers,
                body: modifiedBody
            };
        }

        return {
            method,
            headers
        }   
    }

    // Categories

    async getCategories() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCategoriesWithoutAssociations() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCategoryById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories/${id}`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCategoryByType(type) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories/type/${type}`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async createCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async updateCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async deleteCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    // Customers

    async getCustomers() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const customers = await fetch(`${api}/admin/customers`, requestOptions);
        const res = await customers.json();
        return res;
    }

    // Employees

    async getEmployees() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const customers = await fetch(`${api}/admin/employees`, requestOptions);
        const res = await customers.json();
        return res;
    }

    // Welcome

    async getWelcomeImages() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const getWelcomeImage = await fetch(`${api}/welcome/images`, requestOptions);
        const res = await getWelcomeImage.json();
        return res;
    }

    async postWelcomeImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const postWelcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await postWelcomeImage.json();
        return res;
    }

    async updateWelcomeImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchWelcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await patchWelcomeImage.json();
        return res;
    }

    async deleteImages(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        console.log('Request options: ', requestOptions);
        const welcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await welcomeImage.json();
        return res;
    }

    async getWelcomeContent() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const getWelcomeContent = await fetch(`${api}/welcome/content`, requestOptions);
        const res = await getWelcomeContent.json();
        return res;
    }

    // Orders

    async getOrders() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const orders = await fetch(`${api}/admin/orders`, requestOptions);
        const res = await orders.json();
        return res;
    }

    // Products

    async getProducts() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const products = await fetch(`${api}/products`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getProductsByType(type) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const products = await fetch(`${api}/products/type/${type}`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getInventory() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const inventory = await fetch(`${api}/admin/products`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async getProductTypes() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const productTypes = await fetch(`${api}/admin/products/product-types`, requestOptions);
        const res = await productTypes.json();
        return res;
    }

    async getFlavorProfiles() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const flavorProfiles = await fetch(`${api}/products/flavor-profiles/all`, requestOptions);
        const res = await flavorProfiles.json();
        return res;
    }

    async createProduct(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const product = await fetch(`${api}/admin/products`, requestOptions);
        const res = await product.json();
        return res;
    }

    async createFlavorProfile(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const product = await fetch(`${api}/admin/products/flavor-profiles`, requestOptions);
        const res = await product.json();
        return res;
    }

    async addFlavorProfileIcon(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        console.log('Request Options: ', requestOptions);
        const product = await fetch(`${api}/admin/products/flavor-profiles/icon`, requestOptions);
        const res = await product.json();
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