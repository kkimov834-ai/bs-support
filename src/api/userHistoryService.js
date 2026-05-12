import api from "./api"

export const getUserHistory = async (acc) => {
    try{ 
        const response = await api.post("/user/history", {
            account: acc
        })  
        return response.data
    } catch(error) {
        console.log("Xəta Baş Verdi:", error)
        return error
    }
}