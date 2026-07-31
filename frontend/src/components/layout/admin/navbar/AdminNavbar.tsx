import { adminAssets } from "../../../../assets/admin";

export default function AdminNavbar() {
  return (
    <div className="flex justify-between items-center w-full py-2 px-[4%] border-b border-(--color-border)">
      <img src={adminAssets.logo} alt="img" className="w-[max(10%,80px)]" />
      <img src={adminAssets.profile_image} alt="img" className="w-10" />
    </div>
  );
}
