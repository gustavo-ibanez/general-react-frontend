import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import BaseDataGrid from '../components/BaseDataGrid';
import BasePage from '../components/BasePage'; 
import Labels from '../utils/label/en-us';
import { getProducts, deleteProduct, addProduct, updateProduct } from '../utils/api/productService';
import BaseButton from '../components/BaseButton';
import BaseInput from '../components/BaseInput';
import BaseTopPage from '../components/BaseTopPage';

const Product = () => {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditinhg] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSucessMessage] = useState(null);
    

    useEffect(() => {
        fetchItems();
    }, []);

    const clearForm = () => {
        setEditingItem(null);
        setName("");
        setDescription("");
        setError("")
        setIsEditinhg(false)
        setSucessMessage("")
    }

    const fetchItems = async () => {
        const response = await getProducts()
            .catch((error) => setError(error.message));
        setItems(response.data);
    };

    const startEditing = (item) => {
        setEditingItem(item);
        setName(item.name);
        setDescription(item.description);
        setIsEditinhg(true)
    };

    const deleteItem = async (id) => {
        await deleteProduct(id)
            .catch((error) => setError(error.message));
        fetchItems();
        clearForm();
    };

    const addItem = async () => {
        if (name) {
            const newItem = { name , description};
            await addProduct(newItem)
                .catch((error) => setError(Labels.message.error.error + error.message));
            fetchItems();
            clearForm();
            setSucessMessage(Labels.message.success.add)
        } else {
            setError(Labels.message.error.nameRequired)
        }
    };

    const editItem = async () => {
        if (name) {
            const updatedItem = { ...editingItem, name , description};
            await updateProduct(editingItem.id, updatedItem)
                .catch((error) => setError(error.message));
            fetchItems();
            clearForm();
            setSucessMessage(Labels.message.success.update)
        } else {
            setError(Labels.message.error.nameRequired)
        }
    };

    const columns = [
        { field: 'name', headerName: Labels.name, flex: 1, headerClassName: 'super-app-theme--header'},
        { field: 'description', headerName: Labels.description, flex: 1, headerClassName: 'super-app-theme--header'},
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
        name: item.name,
        description: item.description
    }));

    return (
        <BasePage>
            <div>
                <BaseTopPage 
                    label= {Labels.product}
                    error={error}
                    successMessage={successMessage}
                />

                <BaseInput 
                    label={Labels.name}
                    value={name} 
                    onChange={(e) => setName(e.target.value)} />

                <BaseInput 
                    label={Labels.description}
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} />

                <BaseButton
                    onClick={editingItem ? editItem : addItem}
                    label = {editingItem ? Labels.button.edit : Labels.button.add} />

                {isEditing && (
                    <BaseButton 
                        onClick={clearForm}
                        label = {Labels.button.cancelEdition} />
                )}
            </div>
            <div>
                <BaseDataGrid 
                    rows={rows} 
                    columns={columns} 
                />
            </div>
        </BasePage>
    );
}

export default Product