function fetchProductsFromAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;

      if (!success) {
        return reject(new Error("Gagal mengambil data produk"));
      }
const jsonData = JSON.stringify([
        { id: 1, name: "Keyboard Mekanikal", category: "Aksesoris", price: 450000, stock: 12 },
        { id: 2, name: "Mouse Wireless", category: "Aksesoris", price: 150000, stock: 0 },
        { id: 3, name: "Monitor 24 inch", category: "Elektronik", price: 1800000, stock: 5 },
        { id: 4, name: "Webcam HD", category: "Elektronik", price: 350000, stock: 8 }
      ]);

      resolve(jsonData);
    }, 1000);
  });
}

function fetchSuppliersById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const suppliers = {
                1:  "PT Sumber Elektronik",
                2: "CV Layar Jaya",
                5: "Toko Kamera Sejahtera"
            };
            resolve({ id, supplierName: suppliers[id] || "Tidak diktahui" });
        }, 800);
    });
}


console.log("========== SOAL 14 ==========");
let cacheData = null;
let lastFetchTime = 0;

async function fetchProductsWithCache() {
  const now = Date.now();

  if (cacheData && now - lastFetchTime < 5000) {
    return cacheData;
  }

  const freshData = await fetchProductsFromAPI();
  cacheData = freshData;
  lastFetchTime = now;

  return cacheData;
}

async function testCache() {
  console.log("Panggilan 1 (Hit API):");
  console.log(await fetchProductsWithCache());

  setTimeout(async () => {
    console.log("Panggilan 2 (Dari Cache, < 5 detik):");
    console.log(await fetchProductsWithCache());
  }, 2000);

  setTimeout(async () => {
    console.log("Panggilan 3 (Hit API lagi, > 5 detik):");
    console.log(await fetchProductsWithCache());
  }, 6000);
}

testCache();