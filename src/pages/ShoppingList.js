import React, { useState, useEffect } from 'react';
import { Checkbox, IconButton, } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import BasePage from '../components/BasePage';
import { useLanguage } from "../context/LanguageContext";
import { getProducts } from '../utils/api/productService';
import {getShoppingList, deleteShoppingList, updateShoppingList, addShoppingList} from '../utils/api/shoppingListService';
import SellIcon from '@mui/icons-material/Sell';
import ProductPrice from './ProductPrice';
import BaseButton from '../components/BaseButton';
import BaseSelect from '../components/BaseSelect';
import BaseInput from '../components/BaseInput';
import BaseDataGrid from '../components/BaseDataGrid';
import BaseTopPage from '../components/BaseTopPage';

const ShoppingList = () => {

    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [listProduct, setListProduct] = useState('');
    const [isEditing, setIsEditinhg] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSucessMessage] = useState(null);
    const [itemInformation, setItemInformation] = useState([]);
    const { Labels } = useLanguage();

    useEffect(() => {
        fetchProducts();
        fetchItems();
    }, []);

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const clearForm = () => {
        setEditingItem(null);
        setSelectedProduct("")
        setQuantity(1);
        setIsEditinhg(false)
        setError("")
        setSucessMessage("")
        setItemInformation("")
    }

    const fetchProducts = async () => {
        const response = await getProducts()
            .catch((error) => setError(error.message));
        const data = response.data
        setProducts(response.data);

        const list = data.reduce((acc, item) => {
            acc[item._id] = item;
            return acc;
        }, {});

        setListProduct(list)
    };

    const fetchItems = async () => {
        const response = await getShoppingList()
            .catch((error) => setError(error.message));
        setItems(response.data);
    };

    const addItem = async () => {
        if (selectedProduct) {
            const newItem = { "product_id": selectedProduct, quantity, purchased: false };
            await addShoppingList(newItem);
            fetchItems();
            clearForm();
            setSucessMessage(Labels.message.success.add)
        } else {
            setError(Labels.message.error.allRequired)
        }
    };

    const deleteItem = async (id) => {
        await deleteShoppingList(id)
            .catch((error) => setError(error.message));
        fetchItems();
        clearForm();
    };

    const toggleComprado = async (item) => {
        const updatedItem = { ...item, purchased: !item.purchased };
        await updateShoppingList(item.id, updatedItem)
            .catch((error) => setError(error.message));
        fetchItems();
        clearForm(); 
    };

    const startEditing = (item) => {
        if (item.purchased) {
            setError(Labels.message.error.purchasedUpdate)
            return
        } 
        clearForm()
        setEditingItem(item);
        setSelectedProduct(item.product_id)
        setQuantity(item.quantity);
        setIsEditinhg(true)
    };


    const showInformation = async (item) => {
        clearForm()
        setItemInformation(await <ProductPrice initialProduct={item.product_id}/>)
    }

    const editItem = async () => {
        const updatedItem = { ...editingItem, quantity };
        await updateShoppingList(editingItem.id, updatedItem)
            .catch((error) => setError(Labels.message.error.error + error.message));
        fetchItems();
        clearForm();
        setSucessMessage(Labels.message.success.update)
    };

    const columns = [
        { field: 'name', headerName: Labels.item, flex: 1, headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                listProduct[params.row.product_id] ? listProduct[params.row.product_id].name : "not_found"
            )
        },
        { field: 'quantity', headerName: Labels.quantity, width: 70},
        {

            field: 'purchased', 
            headerName: Labels.purchased, 
            width: 85, 
            renderCell: (params) => (
                <Checkbox
                    checked={params.row.purchased}
                    onChange={() => toggleComprado(params.row)}
                    inputProps={{ 'aria-label': 'Purchased' }}
                />
            )
        },
        {
          field: 'actions',
          headerName: '',
          width: 140,
          renderCell: (params) => (
            <>
                <IconButton variant="contained"  button="true" onClick={() => showInformation(params.row)} >
                    <SellIcon />
                </IconButton>
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
        quantity: item.quantity,
        purchased: item.purchased,
    }));

    return (
        <BasePage>
            <div>
                <BaseTopPage 
                    label={Labels.shoppingList}
                    error={error}
                    successMessage={successMessage}
                />

                <BaseSelect 
                        label = {Labels.product}
                        value={selectedProduct}
                        disabled={isEditing}
                        onChange={handleProductChange}
                        itens = {products}/>

                <BaseInput
                    label={Labels.quantity}
                    type="number"
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} />

                <BaseButton
                    onClick={editingItem ? editItem : addItem}
                    label = {editingItem ? Labels.button.edit : Labels.button.add}/>

                {isEditing && (
                    <BaseButton
                        onClick={clearForm}
                        label = {Labels.button.cancelEdition}/>
                )}
            </div>                         

            <div>
                <BaseDataGrid
                    rows={rows} 
                    columns={columns} 
                    getRowClassName={(params) =>
                        params.row.purchased ? 'highlight-row' : ''
                    }
                />
            </div>
            <div>
                {itemInformation}
            </div>
        </BasePage>
    );
};

export default ShoppingList;