import { Link, useLocation } from "react-router-dom";

// Các Icon SVG bạn gửi
const Icons = {
  Add: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
      <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
      <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
      <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
      <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
      <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
      <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
      <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  ),
  List: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 15h16a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4" />
      <path d="M12 4c3.783 0 6.953 2.133 7.786 5h-15.572c.833 -2.867 4.003 -5 7.786 -5" />
      <path d="M5 12h14" />
    </svg>
  ),
  Package: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12l0 9" />
      <path d="M12 12l-8 -4.5" />
      <path d="M16 5.25l-8 4.5" />
    </svg>
  ),
};

const menus = [
  { label: "Add Food", icon: <Icons.Add />, href: "/admin/add-food" },
  { label: "Food Menu", icon: <Icons.List />, href: "/admin/food-list" },
  { label: "Orders", icon: <Icons.Package />, href: "/admin/order-list" },
];

export default function AdminSidebar() {
  const pathname = useLocation().pathname;

  return (
    <div className="w-[15%] min-h-[calc(100vh-6rem)] bg-white border-r border-slate-200 pt-10 px-4 shadow-sm">
      <div className="flex flex-col gap-3">
        {menus.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`
                flex items-center justify-center md:justify-start gap-4 py-3.5 px-5 rounded-xl transition-all duration-300 group
                ${
                  isActive
                    ? "bg-(--color-primary) text-white shadow-lg shadow-orange-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-(--color-primary)"
                }
              `}
            >
              <span
                className={`transition-transform duration-300 ${isActive ? "scale-110 text-white" : "group-hover:rotate-12"}`}
              >
                {item.icon}
              </span>
              <p
                className={`font-semibold text-[15px] hidden lg:block tracking-tight ${isActive ? "text-white" : ""}`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
