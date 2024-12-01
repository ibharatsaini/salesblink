import React, { ReactNode, useEffect, useState } from "react";
import { LayoutDashboard, SendHorizontal } from "lucide-react";
import { useLocation } from "react-router";

function Header() {
  const [active, setActive] = useState("dashboard");
  //   useEffect(()=>{
  //         setActive(location.pathname.split("/")[1])
  //   },[location])

  //   useLocation
  console.log(active);
  const navItems = [
    { name: "Dashboard", href: "dashboard", icon: <SendHorizontal /> },
    { name: "Outreach", href: "outreach", icon: <LayoutDashboard /> },
  ];

  return (
    <>
      <div className="w-full h-16 flex px-10 pt-2 ">
        <div className="h-full flex text-xl font-bold my-auto">
          <h1 className="my-auto">Future Blink</h1>
        </div>
        <div className="ml-10 h-full flex flex-row">
          {navItems.map((item, index) => {
            return (
              <Logo
                asKey={item.href}
                href={item.href}
                title={item.name}
                icon={item.icon}
                handleChange={() => {
                  setActive(item.href);
                }}
                className={
                  active == item.href ? `bg-slate-100` : `bg-slate-300`
                }
              />
            );
          })}
        </div>
      </div>
      {/* {active == 'outreach' && <NavBar />} */}
      {<NavBar />}
    </>
  );
}

interface LogoTypes {
  asKey: string;
  href: string;
  title: string;
  icon: ReactNode;
  className: string;
  handleChange: () => void;
}

function Logo({ asKey, href, title, icon, className, handleChange }: LogoTypes) {
  return (
    <a
      key={asKey}
      onClick={handleChange}
      href={href}
      className={`w-full h-full flex w-40 bg-slate-100 cursor-pointer p-2 px-4 gap-3 ${className}`}
    >
      <div className="my-auto">{icon}</div>

      <h2 className="capitalize font-semibold my-auto">{title}</h2>
    </a>
  );
}

function NavBar() {
  const location = useLocation();
  const navLink = [
    { name: "Sequences", href: "sequence", icon: <SendHorizontal /> },
    { name: "Outbox", href: "outbox", icon: <LayoutDashboard /> },
    { name: "List", href: "list", icon: <LayoutDashboard /> },
  ];
  return (
    <div className="h-[55px] bg-slate-100 mx-10  p-1.5 flex gap-2">
      {navLink.map((item) => {
        return (
          <NavLink
            asKey={item.href}
            href={`${location.pathname}/${item.href}`}
            icon={item.icon}
            title={item.name}
          />
        );
      })}
    </div>
  );
}

function NavLink({
  href,
  title,
  icon,
  asKey,
}: {
  href: string;
  title: string;
  icon: ReactNode;
  asKey: string;
}) {
  return (
    <a
      key={asKey}
      href={href}
      className="h-full flex items-center justify-start w-36 bg-white cursor-pointer border rounded gap-2 px-4"
    >
      <div className="text-blue-500 font-bold">{icon}</div>
      <h2 className="font-bold text-blue-500 tracking-wide">{title}</h2>
    </a>
  );
}

export default Header;
