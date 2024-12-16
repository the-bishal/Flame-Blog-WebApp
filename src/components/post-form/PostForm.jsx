import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index' 
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { linearGradient } from 'framer-motion/client'

function PostForm({post}) {

    console.log("post", post)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title : post?.title || '',
             slug : post?.slug || '',
             content : post?.content || '',
             status : post?.status || 'active',
             category : post?.category || 'Not Specified',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) =>state.auth?.userData)
    console.log("the user data presented are : ",userData)

    const submit = async (data) => {
        if(post) {
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            //deleting the old image because we are updating it 
            if(file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            console.log("dbPost", dbPost)

            if (dbPost) {
                console.log('inside dbpost check')
                navigate(`/post/${dbPost.$id}`)
            }
            
        } else {

            const file = await appwriteService.uploadFile(data.image[0])
            console.log('inside else')

            if (file) {
                console.log(file)
                const fileId = file.$id
                data.featuredImage = fileId 
                console.log("data contains", data)
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId : userData.$id,
                })

                if (dbPost) {
                    console.log('inside dbpost check')
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof(value) ==='string') {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-')
        }
        return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value,{name}) => {
            if (name == 'title') {
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    label="Status"
                    options={["active", "inactive"]}
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Select
                    label="Category"
                    options={['Not Specified','Technology','Education','Lifestyle','Travel','Fitness','Fashion','Food','Health','Other']}
                    className="mb-4"
                    {...register("category", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full ">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
