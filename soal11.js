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


console.log("========== SOAL 11 ==========");

function loadProductsFromJSON(jsonString) {
    const products = JSON.parse(jsonString);

    if (Array.isArray(products)) {
        console.log("Data adalah array");
        return products;
    }
}

const data = `[
        { "id": 1, "name": "Keyboard Mekanikal" },
        { "id": 2, "name": "Mouse Wireless" },
        { "id": 3, "name": "Monitor 24 inch" },
        { "id": 4, "name": "Webcam HD" }
    ]`;
const products = loadProductsFromJSON(data);

console.log(products);