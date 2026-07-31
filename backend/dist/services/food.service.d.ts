export declare const foodService: {
    create(image: string, foodData: any): Promise<import("mongoose").Document<unknown, {}, import("../interfaces/food.interface.js").IFood, {}, import("mongoose").DefaultSchemaOptions> & import("../interfaces/food.interface.js").IFood & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../interfaces/food.interface.js").IFood, {}, import("mongoose").DefaultSchemaOptions> & import("../interfaces/food.interface.js").IFood & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=food.service.d.ts.map