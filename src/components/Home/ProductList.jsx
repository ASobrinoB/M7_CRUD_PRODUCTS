import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../contexts/products/ProductContext";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductList = () => {
  const [product, setProduct] = useState({
    description: "",
    specification: "",
    priceUSD: 0,
    shippingUSD: 0,
    weightKG: 0,
    stock: 0,
    image: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  const ctx = useContext(ProductContext);
  const { products, addProduct, getProducts, deleteProduct } = ctx;

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const sendDataToAddProduct = (event) => {
    event.preventDefault();
    if (!product.description.trim() || !product.priceUSD) {
      return setError("Debes llenar todos los datos requeridos");
    }
    addProduct(product);
    setError(null);
    setProduct({
      description: "",
      specification: "",
      priceUSD: 0,
      shippingUSD: 0,
      weightKG: 0,
      stock: 0,
      image: ""
    });
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <div>
      <h3>
        Crear un producto
      </h3>
      <Box
        component="form"
        onSubmit={sendDataToAddProduct}
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="description"
          name="description"
          label="Descripción Producto"
          value={product.description}
          onChange={handleChange}
        />

        <TextField
          id="specification"
          name="specification"
          label="Especificación"
          value={product.specification}
          onChange={handleChange}
        />

        <TextField
          required
          id="priceUSD"
          name="priceUSD"
          label="Precio USD"
          type="number"
          value={product.priceUSD}
          onChange={handleChange}
        />

        <TextField
          required
          id="shippingUSD"
          name="shippingUSD"
          label="Valor Despacho USD"
          type="number"
          value={product.shippingUSD}
          onChange={handleChange}
        />

        <TextField
          required
          id="weightKG"
          name="weightKG"
          label="Peso KG"
          type="number"
          value={product.weightKG}
          onChange={handleChange}
        />

        <TextField
          id="stock"
          name="stock"
          label="Stock ON-Line"
          type="number"
          value={product.stock}
          onChange={handleChange}
        />

        <TextField
          id="image"
          name="image"
          label="URL Imagen"
          value={product.image}
          onChange={handleChange}
        />

        <Button type="submit">
          {editMode ? "Actualizar" : "Guardar"}
        </Button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Especificación</TableCell>
              <TableCell>Precio USD</TableCell>
              <TableCell>Despacho USD</TableCell>
              <TableCell>Peso KG</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.specification}</TableCell>
                <TableCell>{row.priceUSD}</TableCell>
                <TableCell>{row.shippingUSD}</TableCell>
                <TableCell>{row.weightKG}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
