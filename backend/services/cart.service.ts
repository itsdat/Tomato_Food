import userModel from "../models/user.model.js"

export const cartService = {
    async update(userId: string, itemId: string){
        try {
            let userData = await userModel.findById(userId);
            if (!userData) {
                throw new Error("User not found");
            }

           let cartData = (userData.cartData as Record<string, number>) || {};
            if(!cartData[itemId]){
                cartData[itemId] = 1
            }else{
                cartData[itemId] += 1;
            }

            await userModel.findByIdAndUpdate(userId, {cartData});
        } catch (error) {
            console.log("error", error);
        }
    },

    async delete(userId: string, itemId: string){
        try {
            let userData = await userModel.findById(userId);
            if (!userData) {
                throw new Error("User not found");
            }

           let cartData = (userData.cartData as Record<string, number>) || {};
            if(cartData[itemId] as number > 0){
                (cartData[itemId] as number) -= 1
            }

            await userModel.findByIdAndUpdate(userId, {cartData});
        } catch (error) {
            console.log("error", error);
        }
    },

    async findMulti(userId: string){
        let userData = await userModel.findById(userId);
        let cartData = userData?.cartData;
        return cartData
    },
}