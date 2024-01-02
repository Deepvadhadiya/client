import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../../styles/Layout.css';
import { useSelector } from 'react-redux';

const SidebarMenu = () => {
  //get user state
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  return (
      <div>
          <div className="sidebar">
              <div className="menu">
                  {user?.role === "organisation" && (
                      <>
                          <div className={`menu-item ${location.pathname === "/" && 'active'}`}>
                              <Link to="/"><i className="fa-solid fa-warehouse"></i> Inventory</Link>
                          </div>
                          <div className={`menu-item ${location.pathname === "/donar" && 'active'}`}>
                              
                              <Link to="/donar"><i className="fa-solid fa-hand-holding-medical"></i> Donar</Link>
                          </div>
                          <div className={`menu-item ${location.pathname === "/hospital" && 'active'}`}>
                              
                              <Link to="/hospital"><i className="fa-solid fa-hospital"></i> Hospital</Link>
                          </div>
                      </>
                  )}
                  {(user?.role === "donar" || user?.role === "hospital") && (
                      <div className={`menu-item ${location.pathname === "/organisation" && 'active'}`}>
                          
                          <Link to="/organisation"><i className="fa-solid fa-building-ngo"></i> Organisation</Link>
                      </div>
                  )}
                  {user?.role === "hospital" && (
                      <div className={`menu-item ${location.pathname === "/consumer" && 'active'}`}>
                          
                          <Link to="/consumer"><i className="fa-solid fa-user"></i> Consumer</Link>
                      </div>
                  )}
                  {user?.role === "donar" && (
                      <div className={`menu-item ${location.pathname === "/donation" && 'active'}`}>
                          
                          <Link to="/donation"><i className="fa-solid fa-user"></i> Donation</Link>
                      </div>
                  )}
                  {user?.role === "admin" && (
                      <>
                          <div className={`menu-item ${location.pathname === "/donar-list" && 'active'}`}>
                              
                              <Link to="/donar-list"><i className="fa-solid fa-warehouse"></i> Donar List</Link>
                          </div>
                          <div className={`menu-item ${location.pathname === "/hospital-list" && 'active'}`}>
                              
                              <Link to="/hospital-list"><i className="fa-solid fa-hand-holding-medical"></i> Hospital List</Link>
                          </div>
                          <div className={`menu-item ${location.pathname === "/organisation-list" && 'active'}`}>
                              
                              <Link to="/organisation-list"><i className="fa-solid fa-hospital"></i> Organisation</Link>
                          </div>
                      </>
                  )}
                  {/* <div className={`menu-item ${location.pathname === "/" && 'active'}`}>
                      <i className="fa-solid fa-warehouse"></i>
                      <Link to="/">Inventory</Link>
                  </div>
                  <div className={`menu-item ${location.pathname === "/donar" && 'active'}`}>
                      <i className="fa-solid fa-hand-holding-medical"></i>
                      <Link to="/donar">Donar</Link>
                  </div>
                  <div className={`menu-item ${location.pathname === "/hospital" && 'active'}`}>
                      <i className="fa-solid fa-hospital"></i>
                      <Link to="/hospital">Hospital</Link>
                  </div>
                  <div className={`menu-item ${location.pathname === "/organisation" && 'active'}`}>
                      <i className="fa-solid fa-building-ngo"></i>
                      <Link to="/organisation">Organisation</Link>
                  </div> */}

                  {/* {userMenu.map((menu) => {
                      const isActive = location.pathname === menu.path
                      return (
                          <div key={menu.name} className={`menu-item ${isActive && 'active'}`}>
                              <i className={menu.icon}></i>
                              <Link to={menu.path}>{menu.name}</Link>
                          </div>
              )
                  })} */}
              </div>
          </div>
      </div>
  )
}

export default SidebarMenu
