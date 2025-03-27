import React, { useState, useEffect } from 'react';
import {  IconButton} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import BaseDataGrid from '../components/BaseDataGrid';
import BasePage from '../components/BasePage';
import { useLanguage } from "../context/LanguageContext";
import { getStores, deleteStore, updateStore, addStore } from '../utils/api/storeService';
import BaseButton from '../components/BaseButton';
import BaseInput from '../components/BaseInput';
import BaseTopPage from '../components/BaseTopPage';

const Store = () => {

    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [name, setName] = useState("");
    const [isEditing, setIsEditinhg] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSucessMessage] = useState(null);
    const { Labels } = useLanguage();

    useEffect(() => {
        fetchItems();
    }, []);

    const clearForm = () => {
        setEditingItem(null);
        setName("");
        setError("")
        setIsEditinhg(false)
        setSucessMessage("")
    }

    const fetchItems = async () => {
        const response = await getStores()
            .catch((error) => setError(error.message));
        setItems(response.data);
    };

    const startEditing = (item) => {
        setEditingItem(item);
        setName(item.name);
        setIsEditinhg(true)
    };

    const deleteItem = async (id) => {
        await deleteStore(id)
            .catch((error) => setError(error.message));
        fetchItems();
        clearForm();
    };

    const addItem = async () => {
        if (name) {
            const newItem = { name };
            await addStore(newItem)
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
        if (name) {
            const updatedItem = { ...editingItem, name };
            await updateStore(editingItem.id, updatedItem)
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
        { field: 'name', headerName: Labels.item, flex: 1, headerClassName: 'super-app-theme--header'},
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
        name: item.name
    }));

    return (
        <BasePage>
            <div>
                <BaseTopPage 
                    label={Labels.store}
                    error={error}
                    successMessage={successMessage}
                />

                <BaseInput
                    label={Labels.name}
                    type="string"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} />

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
                />
            </div>
        </BasePage>
    );
}

export default Store