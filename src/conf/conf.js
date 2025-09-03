const conf={
    appwriteUrl:String(import.meta.env.VITE_APP_APPWRITE),
    appwriteProjectId:String(import.meta.env.VITE_APP_APPWRITE),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABSE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APP_BUCKET_ID)
}

export default conf;