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

console.log("/== SOAL 20 ==");

const urutkanProduk = (daftarArray, kunciKriteria, arahUrutan = "asc") => {
  
  return [...daftarArray].sort((a, b) => {
    let nilaiA = a[kunciKriteria];
    let nilaiB = b[kunciKriteria];

    
    if (typeof nilaiA === "string") nilaiA = nilaiA.toLowerCase();
    if (typeof nilaiB === "string") nilaiB = nilaiB.toLowerCase();

    if (nilaiA < nilaiB) return arahUrutan === "asc" ? -1 : 1;
    if (nilaiA > nilaiB) return arahUrutan === "asc" ? 1 : -1;
    return 0;
  });
};

console.log(urutkanProduk(products, "harga", "desc"));

console.log(urutkanProduk(products, "name", "asc"));
