import { assets } from "../../../../assets";

const socials = [
  { img: assets.facebook_icon, lable: "Fa", url: "" },
  { img: assets.twitter_icon, lable: "Fa", url: "" },
  { img: assets.linkedin_icon, lable: "Fa", url: "" },
];

export default function Footer() {
  return (
    <div
      className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center justify-between gap-5 py-5 px-[8vw] pt-20 mt-25"
      id="contact"
    >
      <div className="w-full flex flex-col md:grid grid-cols-[2fr_1fr_1fr] md:gap-20 gap-8.75">
        <div className="flex flex-col items-start gap-5">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
            dolores optio iste. Facilis necessitatibus ab eaque! Nisi dolore qui
            praesentium aliquid quisquam odio necessitatibus alias aliquam
            dolores reiciendis? Libero, nemo.
          </p>
          <div className="flex items-center justify-center gap-3">
            {socials.map((item, index) => (
              <img
                key={index}
                src={item.img}
                alt={item.lable}
                className="w-10"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white text-lg font-medium">COMPANY</h2>
          <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white text-lg font-medium">GET IN TOUCH</h2>
          <ul className="flex flex-col gap-2">
            <li>+99-999-999-9999</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>

      <hr className="border-none bg-[#838080] w-full h-0.5 my-5" />
      <p>Copyright 2026 © Tomato.com - All Right Reserved.</p>
    </div>
  );
}
