import { useReducer } from 'react';
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import axiosClient from '../../config/axios';

const ProductState = (props) => {
    const initialState = {
        products: []
    }

    const [ globalState, dispatch ] = useReducer(ProductReducer, initialState);

    const addProduct = async (dataForm) => {
        const form = {
            description: dataForm.description,
            specification: dataForm.specification,
            priceUSD: dataForm.priceUSD,
            shippingUSD: dataForm.shippingUSD,
            weightKG: dataForm.weightKG,
            stock: dataForm.stock,
            image: dataForm.image
        }
        try {
            await axiosClient.post(`/product/add-product`, form);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

    const getProducts = async () => {
        try {
            const res = await axiosClient.get('/product/get-products');
            dispatch({
                type: "OBTENER-PRODUCTOS",
                payload: res.data.products
            })
        } catch (error) {
            console.log(error);
        }
    }
    const deleteProduct = async (id) => {
        const data = { id };
        try {
            await axiosClient.delete(`/product/delete-product`, { data });
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProductContext.Provider value={{
            products: globalState.products,
            addProduct,
            getProducts,
            deleteProduct
            }}>
            { props.children }
        </ProductContext.Provider>
    )
}

export default ProductState;