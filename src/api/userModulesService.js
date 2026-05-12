import api from "./api"

export const getUserModules = async (acc) => {
    try{
        const response = await api.post("/user/modules", {
            account: acc
        })
       return response.data
    }catch(error) {
        console.log("Xəta Tpıldı:", error)
        return error
    }
}