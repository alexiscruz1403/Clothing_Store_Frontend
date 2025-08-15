const usersTableHeaders = [
    {label: 'ID', key: 'user_id'},
    {label: 'Nombre', key: 'username'},
    {label: 'Email', key: 'email'},
    {label: 'Teléfono', key: 'phone'},
    {label: 'Roles', key: 'roles', special: 'roles'},
    {label: 'Acciones', key: 'edit-delete', special: 'actions'}
];

const productsTableHeaders = [
    {label: 'ID', key: 'product_id'},
    {label: 'Nombre', key: 'product_name'},
    {label: 'Marca', key: 'product_brand'},
    {label: 'Categoría', key: 'product_category'},
    {label: 'Género', key: 'product_genre'},
    {label: 'Descripción', key: 'product_description'},
    {label: 'Precio', key: 'product_price'},
    {label: 'Stock', key: 'stocks', special: 'stocks'},
    {label: 'Imagenes', key: 'images', special: 'links'},
    {label: 'Acciones', key: 'edit-delete', special: 'actions'}
];

const ordersTableHeaders = [
    {label: 'ID', key: 'order_id'},
    {label: 'Usuario', key: 'user'},
    {label: 'Productos', key: 'products', special: 'products'},
    {label: 'Total', key: 'total'},
    {label: 'Fecha', key: 'order_date'},
    {label: 'Dirección', key: 'order_address'},
    {label: 'Estado', key: 'statuses', special: 'statuses'},
    {label: 'Acciones', key: 'statuses', special: 'actions'}
];

export const TABLE_HEADERS = {
    users: usersTableHeaders,
    products: productsTableHeaders,
    orders: ordersTableHeaders
};