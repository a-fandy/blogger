/* eslint-disable react/prop-types */
import { Link, Outlet } from "react-router-dom";

const menus = [
    { title: "Shop", url: "/shop" },
    { title: "Blog", url: "/blog" },
    { title: "About Me", url: "/aboutme" }
];

const MenuLink = ({ menu }) => (
    <li>
        <Link to={menu.url} className="hover:text-black text-lg text-gray-500">{menu.title}</Link>
    </li>
);

const Layout = () => {
    return (
        <>
            <header className="sticky top-0 z-50 border-b border-gray-300 shadow-lg">
                <nav className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <button tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </button>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {menus.map((menu, index) => (
                                    <MenuLink key={index} menu={menu} />
                                ))}
                            </ul>
                        </div>
                        <Link to="/" className="hover:text-black text-xl text-gray-500">Blogger</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {menus.map((menu, index) => (
                                <MenuLink key={index} menu={menu} />
                            ))}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle">
                            <Link to="/login" className="fa-solid fa-user text-xl"></Link>
                        </button>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout