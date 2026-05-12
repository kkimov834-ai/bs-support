import api from "./api"

export const userProfiles = async (acc) => {
    try{
        const response = api.post("/user/profileUsers", {
            account: acc
        })
        return response.data
    } catch (error) {
        console.log("Xəta Baş Verdi:", error)
        return null
    }
}