const userTableInputs = [
    [
        { label: 'Info del usuario', type: 'title' },
        { label: 'ID', key: 'user_id', type: 'number', modifiable: false, required: true },
        { label: 'Nombre', key: 'username', type: 'text', modifiable: true, required: true },
        { label: 'Teléfono', key: 'phone', type: 'text', modifiable: true, required: false },
    ],
    [
        { label: 'Autenticación', type: 'title' },
        { label: 'Email', key: 'email', type: 'text', modifiable: true, required: true },
    ],
    [
        { label: 'Roles', type: 'title' },
        { label: 'Roles', key: 'roles', type: 'select', options: ['Administrador', 'Despachador', 'Usuario'], modifiable: true, required: true }
    ]
];

const productTableInputs = [
    [
        { label: 'Info del producto', type: 'title' },
        { label: 'ID', key: 'product_id', type: 'number', modifiable: false, required: true },
        { label: 'Nombre', key: 'product_name', type: 'text', modifiable: true, required: true },
        { label: 'Marca', key: 'product_brand', type: 'text', modifiable: true, required: true },
        { label: 'Descripción', key: 'product_description', type: 'textarea', modifiable: true, required: true },
        { label: 'Precio', key: 'product_price', type: 'number', modifiable: true, required: true },
    ],
    [
        { label: 'Filtros', type: 'title' },
        { label: 'Categoría', key: 'product_category', type: 'select', options: ['Remeras', 'Pantalones', 'Calzados', 'Abrigos'] },
        { label: 'Género', key: 'product_genre', type: 'select', options: ['Hombres', 'Mujeres', 'Unisex'] },
    ],
    [
        { label: 'Stock', type: 'title' },
        { label: 'Stock', key: 'stocks', type: 'stock' },
    ],
    [
        { label: 'Imagenes', type: 'title' },
        { label: 'Imagen principal', key: 'images', type: 'image', primary: true, modifiable: true, required: true },
        { label: 'Imagenes adicionales', key: 'images', type: 'image', primary: false, multiple: true}
    ]
    
];

export const INPUTS = {
    users: userTableInputs,
    products: productTableInputs,
}