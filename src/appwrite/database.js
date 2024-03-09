import conf from '../conf/conf'
import { Client , ID, Databases , Storage , Query } from 'appwrite'

export class DatabaseService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title ,  image , status , content , userId }){
        try {

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title , 
                    image , 
                    status , 
                    content , 
                    userId 
                }
            )
            
        } catch (error) {
            console.log("Appwrite Database :: create post :: ",error);
        }
    }
    // file related service
    async uploadFile(file){
        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            // return true
            
        } catch (error) {

            console.log( "Upload file error", error );
            
        }
    }

    async getPosts(filter = [Query.equal( 'status' , 'active')]){
        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                filter
            )

        } catch (error) {

            console.log( "Get posts error" , error );
            
        }
    }

    async getYourPosts(filter = [Query.equal( 'status' , 'active')]) {
        try {
             return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                filter
            )
        } catch (error) {
            console.log("Error fetching your posts:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    

    async getInactivePosts(filter = [Query.equal( 'status' , 'inactive')]){
        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                filter
            )

        } catch (error) {

            console.log( "Get posts error" , error );
            
        }
    }

    // file related service
    async fileViewer(fileId){

        try {

            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )

        } catch (error) {

            console.log( "File viewer error: ", error);
            
        }

    }

    async getPost(anyData){
        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                anyData
            )
            
        } catch (error) {
            console.log( "Error one post: ", error);
        }
    }

    async deletePost(data){
        try {

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                data
            )
            return true
            
        } 
         catch (error) {
            console.log("Delete Post Error :: appwrite :: ", error);   
        }
    }
    // file related service
    async deleteFile(fileID){
        try {

            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true
        } catch (error) {
            console.log( "Error deleting file :: AppWrite", error );
        }
    }

    async updatePost( slug , {title , content , image , status}){

        try {

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                 slug ,
                {title , content , image , status}
            )
            
        } catch (error) {

            console.log( "Update Post Error :: ", error);
            
        }
    }

}



const databaseService = new  DatabaseService()

export default databaseService
