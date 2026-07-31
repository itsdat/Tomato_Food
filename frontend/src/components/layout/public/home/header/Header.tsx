export default function Header() {
  return (
    <div className="h-[50vw] md:h-[34vw] mx-auto my-7.5 bg-[url('/header_img.png')] bg-no-repeat bg-cover lg:bg-contain relative w-full rounded-2xl">
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fade lg:max-w-[50%] md:max-w-[65%]">
        <h2 className="font-medium text-white text-[max(4.5vw,22px)] lg:leading-[max(5vw,10px)]">
          Order your favorite food here.
        </h2>
        <p className="text-white text-[1vw] lg:block hidden">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="text-[#747474] font-medium md:px-[2.3vw] md:py-[1vw] bg-white text-[max(1vw, 13px)] rounded-[50px] cursor-pointer py-[1vw] px-[3vw]">
          View Menu
        </button>
      </div>
    </div>
  );
}
