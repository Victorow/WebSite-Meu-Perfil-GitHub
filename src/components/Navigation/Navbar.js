import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaHome, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled(motion.nav)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    height: 100vh;
    width: 300px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    justify-content: center;
    transition: right 0.3s ease;
    z-index: 1001;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ${props => props.active && `
    background: rgba(255, 255, 255, 0.2);
    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background: #ff6b6b;
      border-radius: 50%;
    }
  `}
`;

const MenuToggle = styled.div`
  display: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    z-index: 1002;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub />
          GitHub Explorer
        </Logo>

        <NavLinks isOpen={isOpen}>
          <NavLink 
            to="/" 
            active={isActive('/') ? 1 : 0}
            onClick={() => setIsOpen(false)}
          >
            <FaHome /> Início
          </NavLink>
          <NavLink 
            to="/busca" 
            active={isActive('/busca') ? 1 : 0}
            onClick={() => setIsOpen(false)}
          >
            <FaSearch /> Buscar
          </NavLink>
        </NavLinks>

        <MenuToggle onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
