import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Icono() {
  const navigate = useNavigate()
  const{cartQuantity}= useCart()

  return (
    <Badge 
    badgeContent={cartQuantity()} 
    color="primary" 
    onClick={() => navigate(`/cart`)}
    style={{cursor: 'pointer'}}
    >

      <ShoppingCartIcon color="white" style={{ fontSize:40}} />
    </Badge>
  );
}
