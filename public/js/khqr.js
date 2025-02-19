// document.addEventListener("DOMContentLoaded", function () {
    const KHQR = typeof BakongKHQR !== 'undefined' ? BakongKHQR : null;
    let amount;

    // Update amount value when the input changes
    const amountInput = document.getElementById("amount");
    if (amountInput) {
        amountInput.addEventListener("input", function () {
        amount = this.value;
        optionalData.amount = amount;
        
        console.log(optionalData.amount);
        });
    }

    if (KHQR) {
        const data = KHQR.khqrData;
        const info = KHQR.IndividualInfo;

        const optionalData = {

            // currency: data.currency.usd,
            // upiMerchantAccount: "0001034400010344ABCDEFGHJIKLMNO"
            amount: amount,
            mobileNumber: "85598205499",
            storeLabel: "Code Talk",
            terminalLabel: "Cashier_1",
            purposeOfTransaction: "oversea",
            languagePreference: "km",
            
            // merchantNameAlternateLanguage: "ចន ស្មីន",
            // merchantCityAlternateLanguage: "សៀមរាប",
        };

        const individualInfo = new info("vannak_dim@cadi", "VANNAK DIM", "PHNOM PENH", optionalData);
        const khqrInstance = new KHQR.BakongKHQR();
        const individual = khqrInstance.generateIndividual(individualInfo);

        let qrCodeData = individual ? individual.data.qr : null;
        let md5Value = individual ? individual.data.md5 : null;

        // Function to display QR code in the modal
        const displayQRCode = () => {
            if (individual && individual.data && individual.data.qr) {
                const qrCodeCanvas = document.getElementById("qrCodeCanvas");
                // Generate the QR code onto the canvas
                QRCode.toCanvas(qrCodeCanvas, qrCodeData, function (error) {
                    if (error) console.error(error);
                });

                // Show the modal
                const qrCodeModal = new bootstrap.Modal(document.getElementById("qrCodeModal"));
                qrCodeModal.show();
                start_khqr_scan();
                console.log(md5Value);
                console.log(qrCodeData);
            } else {
                console.error("QR code data is not available.");
            }
        };

        function fetchTransactionStatus(md5) {
            const token = process.env.BAKONG_API_TOKEN; // Ensure you have BAKONG_API_TOKEN defined in your .env file
            const url = "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5";
            const data = {
                md5: md5
            };
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    md5: md5
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.responseMessage === "Success") {
                        alert("Transaction is successful.");
                        // window.location.href = "/";
                        console.log(data.data);
                        clearInterval(checkInterval);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        };


        let checkInterval;

        function start_khqr_scan() {
            if (md5Value) {
                checkInterval = setInterval(() => {
                    fetchTransactionStatus(md5Value);
                }, 3000);
            } else {
                console.error("MD5 value is not available.");
            }
        }

        // Attach event listeners for the Checkout button
        const checkoutButton = document.getElementById("checkout");
        if (checkoutButton) {
            checkoutButton.addEventListener("click", displayQRCode);
        }

    } // <-- Add this closing brace
    else {
        console.error("Bakong KHQR or its components are not loaded or defined.");
    }
// });
