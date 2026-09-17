function fetchProductsFromAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.2;

            if (!success) {
                return reject(new Error("Gagal mengambil data produk"));
            }

            const jsonData = JSON.stringify([
                {
                    id: 1,
                    name: "Keyboard Mekanikal",
                    category: "Aksesoris",
                    price: 450000,
                    stock: 12
                },
                {
                    id: 2,
                    name: "Mouse Wireless",
                    category: "Aksesoris",
                    price: 150000,
                    stock: 0
                },
                {
                    id: 3,
                    name: "Monitor 24 inch",
                    category: "Elektronik",
                    price: 1800000,
                    stock: 5
                },
                {
                    id: 4,
                    name: "Webcam HD",
                    category: "Elektronik",
                    price: 350000,
                    stock: 8
                }
            ]);

            resolve(jsonData);
        }, 1000);
    });
}

function fetchSupplierById(id) {
    return new Promise((resolve) => {
        setTimeout(() => {

            const suppliers = {
                1: "PT Sumber Elektronik",
                3: "CV Layar Jaya",
                5: "Toko Kamera Sejahtera"
            };

            resolve({
                id,
                supplierName: suppliers[id] || "Tidak diketahui"
            });

        }, 800);
    });
}

console.log("========== SOAL 9 ==========");

async function sequential() {
    try {
        console.time("Sequential");

        // 1. Ambil data produk terlebih dahulu
        const jsonString = await fetchProductsFromAPI();

        // 2. Ubah JSON menjadi array
        const products = JSON.parse(jsonString);

        console.log("Data produk:");
        console.log(products);

        // 3. Setelah produk selesai, baru ambil supplier
        const supplier = await fetchSupplierById(1);

        console.log("Data supplier:");
        console.log(supplier);

        console.timeEnd("Sequential");

    } catch (error) {
        console.log("Terjadi error:", error.message);
    }
}

sequential();