import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
    items: [],
};

// Load cart from localStorage
const loadCart = () => {
    try {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : initialState;
    } catch {
        return initialState;
    }
};

// Cart reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                // Increment quantity but don't exceed stock
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
                            : item
                    ),
                };
            }

            // Add new item
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== id),
                };
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id
                        ? { ...item, quantity: Math.min(quantity, item.stock) }
                        : item
                ),
            };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

// Create context
const CartContext = createContext(null);

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, loadCart());

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    // Computed values
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Actions
    const addToCart = (product) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock,
            },
        });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const value = {
        items: state.items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
