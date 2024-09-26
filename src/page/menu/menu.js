import './menu.css';



const Menu = () => {
    
    console.log("Menu Component Rendered"); // This should show up in the console
    return (
        <div className="menu-container">
            <h1 className="username">Your Name</h1>
            <div className="button-container">
                <button className="menu-button">My Account</button>
                <button className="menu-button">Settings</button>
            </div>
            <div className="button-container">
                <button className="menu-button">About</button>
                <button className="menu-button">Logout</button>
            </div>
        </div>
    );
};

export default Menu;
