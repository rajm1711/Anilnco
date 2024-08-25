import generateUniqueId from "generate-unique-id";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

// Action to fetch products
export const fetchProducts = (data) => ({
    type: "FETCH_PRODUCTS",
    payload: data,
});

// Async action to get products from Firestore
export const productGetAsync = () => {
    return async (dispatch) => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Product Fetch Success:", products);
            dispatch(fetchProducts(products));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
};

// Action to add a product
export const addProduct = (data) => ({
    type: "ADD_PRODUCTS",
    payload: data,
});

// Async action to add a new product to Firestore
export const productPostAsync = (data) => {
    return async (dispatch) => {
        try {
            data.id = generateUniqueId({ length: 4, useLetters: false });
            await addDoc(collection(db, "products"), data);
            console.log("Product Add Success:", data);
            dispatch(productGetAsync()); // Refresh product list
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
};

// Action to update a product
export const updateProduct = (data) => ({
    type: "UPDATE_PRODUCTS",
    payload: data,
});

// Async action to update product in Firestore
export const productUpdateAsync = (data) => {
    return async (dispatch) => {
        try {
            const productRef = doc(db, "products", data.id);
            await updateDoc(productRef, data);
            console.log("Product Update Success:", data);
            dispatch(productGetAsync()); // Refresh product list
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
};

// Action to select a product
export const selectProduct = (data) => ({
    type: 'SELECT_PRODUCTS',
    payload: data
});
// Async action to get a single product by id from Firestore
// export const productSelectAsync = (id) => {
//     console.log("Select",id);
    
//     return async (dispatch) => {
//         try {

//             const productDoc = await getDoc(doc(db, "products", id));
//             if (productDoc.exists()) {
//                 dispatch(selectProduct({ ...productDoc.data(), id: productDoc.id }));
//             } else {
//                 console.error("No such document!");
//             }
//         } catch (error) {
//             console.error("ERROR", error);
//         }
//     };
// };
export const productSelectAsync = (id) => {
    return async (dispatch) => {
        try {
            const productDoc = await getDoc(doc(db, "products", id));
            if (productDoc.exists()) {
                dispatch(selectProduct({ ...productDoc.data(), id: productDoc.id }));
            } else {
                console.error("No such document!");
            }
        } catch (error) {
            console.error("ERROR", error);
        }
    };
};



// // Action to delete a product
// export const deleteProducts = (id) => ({
//     type: "DELETE_PRODUCTS",
//     payload: id,
// });

// Async action to delete a product from Firestore
export const productDeleteAsync = (id) => async (dispatch) => {
    try { 
        const productRef = doc(db, 'products', id); // Adjust the collection name if necessary
        await deleteDoc(productRef);
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch (error) {
        console.error('Error deleting product:', error);
        // Handle error if needed
    }
};

// Action for record update success
const RecordUpdated = (record) => ({
    type: "RECORD_UPDATED",
    payload: record,
});

// Action for record update error
const RecordError = (error) => ({
    type: "RECORD_ERROR",
    payload: error,
});

// Async action to upload file to Firebase Storage
export const uploadFile = (file, record) => {
    return async (dispatch) => {
        try {
            if (!file.name) {
                throw new Error("File name is invalid");
            }

            const storageRef = ref(storage, file.name);  // Use correct path for Firebase storage
            await uploadBytes(storageRef, file);  // Upload file to Firebase storage
            const url = await getDownloadURL(storageRef);

            dispatch(RecordUpdated({ ...record, imageURL: url }));
            return url;
        } catch (error) {
            dispatch(RecordError(error.message));
            console.error("Error uploading file:", error.message);
            throw error;
        }
    };
};
