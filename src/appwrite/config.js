import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); 
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        console.log(conf.appwriteDatabaseId,conf.appwriteCollectionId)

        console.log("database log ",this.databases)
    }

    async createPost({title, slug, content, featuredImage, status, category, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    category,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error",error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, category}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    category,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error",error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true; //it will return true only when awaits completes 
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite :: getPost :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error",error);
            return false;
        }
    }

    //file upload method
    async uploadFile(file) {
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false;
        }
    }

    //it is very fast so thats why we are not making it as async as mentioned in the documentation
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }

}

const service = new Service()

export default service;