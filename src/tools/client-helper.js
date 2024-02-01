import Client from "./client";

const client = new Client();

export default class ClientHelper {
    // Product

    getProductById = async (id) => {
        const res = await client.getProductById(id);

        return res;
    }
}