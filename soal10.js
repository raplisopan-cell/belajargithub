function fetchProductsFromAPI() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const jsonData = JSON.stringify([
                { id: 1, name: "Keyboard Mekanikal" },
                { id: 2, name: "Mouse Wireless" },
                { id: 3, name: "Monitor 24 inch" },
                { id: 4, name: "Webcam HD" }
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

console.log("========== SOAL 10 ==========");

async function parallel() {
    console.time("Parallel");

    const [jsonString, supplier1, supplier3, supplier5] =
        await Promise.all([
            fetchProductsFromAPI(),
            fetchSupplierById(1),
            fetchSupplierById(3),
            fetchSupplierById(5)
        ]);

    const products = JSON.parse(jsonString);

    console.timeEnd("Parallel");

    console.log("Produk:", products);
    console.log("Supplier 1:", supplier1);
    console.log("Supplier 3:", supplier3);
    console.log("Supplier 5:", supplier5);
}

parallel();