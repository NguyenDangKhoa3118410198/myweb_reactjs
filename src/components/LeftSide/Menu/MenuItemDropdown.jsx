import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UilAngleDown } from '@iconscout/react-unicons'
import './menu.css'

const MenuItemDropdown = ({ title, dropdownLinks, icon }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <div className="wrapperMenu">
            <div className="menuItemDropdown" onClick={toggleDropdown}>
                <span className="icon">{icon}</span>
                <span className="item">{title}</span>
                <span
                    className={`iconDropdown ${
                        isDropdownOpen ? 'rotate' : ''
                    } `}
                >
                    <UilAngleDown />
                </span>
            </div>

            {isDropdownOpen && (
                <div className="dropdownContent">
                    {dropdownLinks.map((subLink) => (
                        <NavLink to={subLink.to} key={subLink.to}>
                            {subLink.title}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MenuItemDropdown
