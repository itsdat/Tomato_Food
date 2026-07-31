import userModel from "../models/user.model.js";
export const cartService = {
    async update(userId, itemId) {
        try {
            let userData = await userModel.findById(userId);
            if (!userData) {
                throw new Error("User not found");
            }
            let cartData = userData.cartData || {};
            if (!cartData[itemId]) {
                cartData[itemId] = 1;
            }
            else {
                cartData[itemId] += 1;
            }
            await userModel.findByIdAndUpdate(userId, { cartData });
        }
        catch (error) {
            console.log("error", error);
        }
    },
    async delete(userId, itemId) {
        try {
            let userData = await userModel.findById(userId);
            if (!userData) {
                throw new Error("User not found");
            }
            let cartData = userData.cartData || {};
            if (cartData[itemId] > 0) {
                cartData[itemId] -= 1;
            }
            await userModel.findByIdAndUpdate(userId, { cartData });
        }
        catch (error) {
            console.log("error", error);
        }
    },
    async findMulti(userId) {
        let userData = await userModel.findById(userId);
        let cartData = userData?.cartData;
        return cartData;
    },
};
//# sourceMappingURL=cart.service.js.map