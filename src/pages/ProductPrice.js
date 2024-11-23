import React, { useState, useEffect } from 'react';
import { IconButton} from '@mui/material';
import { Delete, Edit, Label } from '@mui/icons-material';
import BasePage from '../components/BasePage'; 
import Labels from '../utils/label/en-us';
import { getProducts } from '../utils/api/productService';
import { getStores } from '../utils/api/storeService';
import { deleteProductPrice, updateProductPrice, addProductPrice, getProductPriceByFilter } from '../utils/api/priceProductService';
import BaseDataGrid from '../components/BaseDataGrid';
import BaseButton from '../components/BaseButton';
import BaseSelect from '../components/BaseSelect';
import BaseInput from '../components/BaseInput';
import BaseTopPage from '../components/BaseTopPage';

// initialProduct= '672a527d266e56617cffc062'
const ProductPrice = ({ initialProduct = ''}  ) => {
    
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [isEditing, setIsEditinhg] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSucessMessage] = useState(null);

    const [price, setPrice] = useState("");
    
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(initialProduct);
    const [listProduct, setListProduct] = useState('');

    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');
    const [listStore, setListStore] = useState('');
    
    useEffect(() => {
        fetchProducts();
        fetchStores();
        fetchItems();
    }, []);

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const fetchProducts = async () => {
        const response = await getProducts()
            .catch((error) => setError(Label.message.error.error + error.message));
        const data = response.data
        setProducts(response.data);

        const list = data.reduce((acc, item) => {
            acc[item._id] = item;
            return acc;
        }, {});

        setListProduct(list)
    };

    const handleStoreChange = (event) => {
        setSelectedStore(event.target.value);
    }

    const fetchStores = async () => {
        const response = await getStores()
            .catch((error) => setError(error.message));
        const data = response.data
        setStores(response.data);

        const list = data.reduce((acc, item) => {
            acc[item._id] = item;
            return acc;
        }, {});

        setListStore(list)
    };

    const clearForm = () => {
        setEditingItem(null);
        setPrice("");
        setSelectedProduct("")
        setSelectedStore("")
        setIsEditinhg(false)
        setError("")
        setSucessMessage("")
    }

    const fetchItems = async () => {
        setSelectedProduct(initialProduct)
        var filter = ""
        if (selectedProduct) {
            filter = "product_id=" + selectedProduct + "&"
        }

        if (selectedStore) {
            filter = filter + "store_id=" + selectedStore 
        }

        const response = await getProductPriceByFilter(filter)
            .catch((error) => setError(error.message));            
        setItems(response.data);
        setSelectedStore("")
    };

    const startEditing = (item) => {
        setEditingItem(item);
        setSelectedProduct(item.product_id)
        setSelectedStore(item.store_id)
        setPrice(item.price);
        setIsEditinhg(true)
    };

    const deleteItem = async (id) => {
        await deleteProductPrice(id)
            .catch((error) => setError(error.message));
        fetchItems();
        clearForm();
    };

    const addItem = async () => {
        if (selectedProduct && selectedStore && price) {
            const newItem = { "product_id": selectedProduct, "store_id": selectedStore, price };
            await addProductPrice(newItem)
                .catch((error) => setError(error.message));
            fetchItems();
            clearForm();
            setSucessMessage(Labels.message.success.add)
        } else {
            clearForm();
            setError(Labels.message.error.allRequired)
        }

    };

    const editItem = async () => {
        if (selectedProduct && selectedStore && price) {
            const updatedItem = { ...editingItem, price };
            await updateProductPrice(editingItem.id, updatedItem)
                .catch((error) => setError(error.message));            
            fetchItems();
            clearForm();
            setSucessMessage(Labels.message.success.update)
        } else {
            clearForm();
            setError(Labels.message.error.allRequired)
        }
    };

    const columns = [
        { field: 'product', headerName: Labels.product, flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                listProduct[params.row.product_id] ? listProduct[params.row.product_id].name : "not_found"
            )
        },
        { field: 'store', headerName: Labels.store, flex: 2, headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                listStore[params.row.store_id] ? listStore[params.row.store_id].name : "not_found"
            )
        },
        { field: 'price', headerName: Labels.price, width: 100},
        {
          field: 'actions',
          headerName: '',
          width: 110,
          renderCell: (params) => (
            <>
                <IconButton button="true" onClick={() => startEditing(params.row)}>
                    <Edit />
                </IconButton>
                <IconButton button="true" onClick={() => deleteItem(params.id)}>
                    <Delete />
                </IconButton>
            </>
          ),
        }
    ];

    const rows = items.map((item, index) => ({
        id: item._id || index,
        product_id: item.product_id,
        store_id: item.store_id,
        price: item.price
    }));

    return (
        <BasePage>
            {!initialProduct && (
                <div>
                    <BaseTopPage 
                        label= {Labels.productPrice}
                        error={error}
                        successMessage={successMessage}
                    />

                    <BaseSelect 
                        label = {Labels.store}
                        value={selectedStore}
                        disabled={isEditing}
                        onChange={handleStoreChange}
                        itens = {stores}/>

                    <BaseSelect 
                        label = {Labels.product}
                        value={selectedProduct}
                        disabled={isEditing}
                        onChange={handleProductChange}
                        itens = {products}/>
                    
                    <BaseInput
                        label={Labels.price}
                        type="float"
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} />

                    <BaseButton
                        onClick={editingItem ? editItem : addItem}
                        label = {editingItem ? Labels.button.edit : Labels.button.add}/>

                    {!isEditing && (
                        <BaseButton onClick={fetchItems}
                                label = {Labels.button.search}/>       
                    )}

                    {isEditing && (
                        <BaseButton onClick={clearForm}
                            label = {Labels.button.cancelEdition}/>       
                    )}
                </div>
            )}
           
            <div>
                <BaseDataGrid rows={rows} columns={columns} />
            </div>

        </BasePage>

    );
}

export default ProductPrice
