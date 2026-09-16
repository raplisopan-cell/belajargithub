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

console.log("/== SOAL 11 ==")
const cekharga = products
.filter(products=> products.category === "Elektronik")
.every(products => products.harga > 300000);
console.log(cekharga);

console.log("/== SOAL 12 ==")
const kelompokproduk = products.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
}, {});
console.log(kelompokproduk);

console.log("/== SOAL 13 ==")

const statusproducts = products.map(product => {
    let status = "Tersedia";
    if (product.stock === 0) status = "Habis";
    else if (product.stock < 3) status = "stok menipis";
    return { ...product, status };
});
console.log(statusproducts);


console.log("/== SOAL 14 ==")
const hargaratarata = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = { totalHarga: 0, count: 0 };
  }
  acc[product.category].totalHarga += product.harga;
  acc[product.category].count += 1;
  return acc;
}, {});

console.log(hargaratarata);

for (const cat in hargaratarata) {
  hargaratarata[cat] = hargaratarata[cat].totalHarga / hargaratarata[cat].count;
};

console.log("/== SOAL 15 ==");

const cariTermahalDanTermurah = (daftarProduk) => {
  if (daftarProduk.length === 0) return { termahal: null, termurah: null };

  return daftarProduk.reduce((hasil, produkSaatIni) => {
   
    if (produkSaatIni.harga > hasil.termahal.harga) {
      hasil.termahal = produkSaatIni;
    }
    
    if (produkSaatIni.harga < hasil.termurah.harga) {
      hasil.termurah = produkSaatIni;
    }
    return hasil;
  }, { termahal: daftarProduk[0], termurah: daftarProduk[0] });
};

console.log(cariTermahalDanTermurah(products));

console.log("/== SOAL 16 ==");

const cariProduk = (kataKunci) => {
  const kataKunciKecil = kataKunci.toLowerCase();
  return products.filter(produk => 
    produk.name.toLowerCase().includes(kataKunciKecil)
  );
};

console.log(cariProduk("MEKANIkal")); 

console.log("/== SOAL 17 ==");

const produkDenganSupplier = products.map(produk => {
  const infoSupplier = suppliers.find(supplier => supplier.id === produk.id);
  return {
    ...produk,
   
    namaSupplier: infoSupplier ? infoSupplier.supplierName : "Supplier Tidak Diketahui"
  };
});

console.log(produkDenganSupplier);

console.log("/== SOAL 18 ==");

const hapusProduk = (idYangDihapus) => {
  return products.filter(produk => produk.id !== idYangDihapus);
};


const daftarProdukBaru = hapusProduk(1); 
console.log(daftarProdukBaru);

console.log("/== SOAL 19 ==");

const ambilProdukPerHalaman = (daftarArray, halaman, jumlahPerHalaman) => {
  const indeksMulai = (halaman - 1) * jumlahPerHalaman;
  const indeksAkhir = indeksMulai + jumlahPerHalaman;
  return daftarArray.slice(indeksMulai, indeksAkhir);
};


console.log(ambilProdukPerHalaman(products, 1, 3)); 

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
