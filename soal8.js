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

console.log("========== SOAL 8 ==========");

async function getSupplier() {
    const supplier = await fetchSupplierById(1);

    console.log("Data Supplier:");
    console.log(supplier);
}

getSupplier();