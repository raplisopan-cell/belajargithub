function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

console.log("========== SOAL 6 ==========");

async function jalankan() {
    console.log("Mulai...");

    await delay(2000);

    console.log("Sudah menunggu 2 detik!");
}

jalankan();