export function toUserMapping(data){
    const result = data?.map((u)=>{
        const user = {
            id:u._id,
            attachment:u.attachment,
            name:u.name,
            email:u.email,
            work:u.work,
            desc:u.desc
        }
        return user
    })
    return result
}