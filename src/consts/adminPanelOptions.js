const inventoryRoleOptions = [
    { label: 'Productos', value: 'products' },
    { label: 'Pedidos', value: 'orders' }
];

const adminRoleOptions = [
    { label: 'Usuarios', value: 'users' },
    { label: 'Productos', value: 'products' },
    { label: 'Pedidos', value: 'orders' }
];

export const ADMIN_PANEL_OPTIONS = {
    1: adminRoleOptions,
    2: inventoryRoleOptions
}