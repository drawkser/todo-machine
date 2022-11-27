import { useState, useEffect } from "react";

function useLocalStorage(itemName, initialValue) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [item, setItem] = useState(initialValue);

    useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;

                if (!localStorageItem) {
                    parsedItem = initialValue;
                    localStorage.setItem(itemName, JSON.stringify(parsedItem));
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                }
                setItem(parsedItem);
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        }, 1000);
    });

    const saveItem = (newItem) => {
        try {
            const todosString = JSON.stringify(newItem);
            localStorage.setItem(itemName, todosString);
            setItem(newItem);
        } catch (error) {
            setError(true);
        }
    };

    return {
        item,
        saveItem,
        loading,
        error,
    };
}

export {useLocalStorage};