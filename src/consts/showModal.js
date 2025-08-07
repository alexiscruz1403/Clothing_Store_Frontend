const productsHeaders = [
    { key: 'product_id', label: 'ID' },
    { key: 'product_name', label: 'Nombre' },
    { key: 'product_size', label: 'Talle' },
    { key: 'product_quantity', label: 'Cantidad' },
    { key: 'product_price', label: 'Precio' },
];

const statusesHeaders = [
    { key: 'status_name', label: 'Estado' },
    { key: 'status_date', label: 'Fecha de creación' },
];

export const SHOW_MODAL_HEADERS = {
    products: productsHeaders,
    statuses: statusesHeaders,
};