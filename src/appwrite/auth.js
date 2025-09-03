import conf from "../conf/conf";

import { Client, Account, ID} from 'appwrite';

// The following is the typical way to use Appwrite directly:
// export const client = new Client();
// client
//     .setEndpoint('https://fra.cloud.appwrite.io/v1')
//     .setProject(conf.appwriteProjectId);
// export const account = new Account(client);
// However, this approach tightly couples your app to Appwrite's SDK, making future changes harder.

// By wrapping Appwrite logic in a class (see below),
// you create an abstraction layer that makes your codebase more flexible and easier to maintain.
// If you ever switch authentication providers, you only need to update this class.

export class AuthService{
    client = new Client();
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            return await this.account.create(ID.unique(), email, password, name);
        } catch (err) {
            console.error("Account creation failed:", err);
            throw err;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service::getCurrentUser::Error",error);
            
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
           console.log("Appwrite service::logout::Error",error);

        }
    }
}

const authService = new AuthService();

export default authService;