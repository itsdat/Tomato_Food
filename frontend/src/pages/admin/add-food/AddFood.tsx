import { useState } from "react";
import { adminAssets } from "../../../assets/admin";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/api.constant";

export default function AddFood() {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHanler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: [value] }));
  };

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image!);

    const res = await axios.post(`${API_URL}/food/create`, formData);

    if (res.data) {
      setData({ name: "", description: "", price: "", category: "Salad" });
      setImage(null);
      toast.success(res.data.message);
    } else {
      console.log(res.data.message);
      toast.error(res.data.message);
    }
  };

  return (
    <div className="w-[90%] mx-auto p-10 animate-fadeIn animate-page">
      <h2 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-[#FF6347] rounded-full"></span>
        Add New Food
      </h2>
      <form
        className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col gap-2.5">
          <p className="font-semibold text-slate-700">Upload Image</p>
          <label
            htmlFor="image"
            className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-(--color-primary) hover:bg-orange-50/30 transition-all overflow-hidden group"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={adminAssets.upload_area}
                  alt="upload"
                  className="w-full opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-xs text-slate-400">Click to upload</span>
              </div>
            )}
          </label>
          <input
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Section: Product Name */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-slate-700">Product Name</p>
          <input
            onChange={onChangeHanler}
            value={data.name}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all"
            type="text"
            name="name"
            placeholder="Type here..."
            required
          />
        </div>

        {/* Section: Description */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-slate-700">Product Description</p>
          <textarea
            onChange={onChangeHanler}
            value={data.description}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all resize-none"
            name="description"
            rows={4}
            placeholder="Write content here..."
            required
          ></textarea>
        </div>

        {/* Section: Category & Price (Flex Group) */}
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-semibold text-slate-700">Category</p>
            <select
              onChange={onChangeHanler}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-(--color-primary) cursor-pointer"
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <p className="font-semibold text-slate-700">Product Price</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                $
              </span>
              <input
                onChange={onChangeHanler}
                value={data.price}
                className="w-full p-3 pl-7 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all"
                type="number"
                name="price"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 py-3 px-10 bg-(--color-primary) text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 active:scale-95 transition-all w-fit"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
}
