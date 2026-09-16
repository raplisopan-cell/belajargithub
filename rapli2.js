const products = [
    { id: 1, name: "Keyboard Mekanikal", category: "Aksesoris", harga: 450000, stock: 12
},
    { id: 2, name: "Mouse Wireless", category: "Aksesoris", harga: 150000, stock: 0
},
    { id: 3, name: "Monitor 24 inch", category: "Elektronik", harga: 1800000, stock: 5
},

    { id: 4, name: "Laptop Stand", category: "Aksesoris", harga: 200000, stock: 25
},
    { id: 5, name: "Webcam HD", category: "Elektronik", harga: 350000, stock: 8
},
    { id: 6, name: "SSD 1TB", category: "Elektronik", harga: 900000, stock: 3
},
    { id: 7, name: "Headset Gaming", category: "Aksesoris", harga: 500000, stock: 0}
];

const suppliers = [
{ id: 1, supplierName: "PT Sumber Elektronik"},
{ id: 2, supplierName: "CV Layar Jaya"},
{ id: 3, supplierName: "Toko Kamera Sejahtera"},
];
 
console.log("================ SOAL 2 ================");
const productssedikitstock = products.filter(product => product.stock < 10);
console.log(productssedikitstock);
