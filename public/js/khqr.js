document.addEventListener("DOMContentLoaded", function () {

    let KHQR = typeof BakongKHQR !== 'undefined' ? BakongKHQR : null;
    let amount = document.getElementById("amount").value || 0; // Default amount value

    let data = KHQR.khqrData;
    let info = KHQR.IndividualInfo;

    let optionalData = {

        amount: amount,
        mobileNumber: "85598205499",
        storeLabel: "Code Talk",
        terminalLabel: "Cashier_1",
        purposeOfTransaction: "oversea",
        languagePreference: "km",
    };

    let individualInfo = new info("vannak_dim@cadi", "VANNAK DIM", "PHNOM PENH", optionalData);
    let khqrInstance = new KHQR.BakongKHQR();
    let individual = khqrInstance.generateIndividual(individualInfo);

    let qrCodeData = individual ? individual.data.qr : null;
    let md5Value = individual ? individual.data.md5 : null;

    let qrCodeModal = new bootstrap.Modal(document.getElementById("qrCodeModal"));

    // Function to display QR code in the modal
    let displayQRCode = () => {
        qrCodeData = individual ? individual.data.qr : null;
        md5Value = individual ? individual.data.md5 : null;
        console.log(optionalData);
        if (individual && individual.data && individual.data.qr) {
            let qrCodeCanvas = document.getElementById("qrCodeCanvas");
            // Generate the QR code onto the canvas
            QRCode.toCanvas(qrCodeCanvas, qrCodeData, function (error) {
                if (error) console.error(error);
            });

            // Show the modal
            qrCodeModal.show();
            start_khqr_scan();
            // console.log(md5Value);
            // console.log(qrCodeData);
        } else {
            console.error("QR code data is not available.");
        }
    };

    function fetchTransactionStatus(md5) {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiOWNmMzU2ZDJmMTBlNDIyZSJ9LCJpYXQiOjE3Mzk4NjA4NjcsImV4cCI6MTc0NzYzNjg2N30.Gsf_UaXMhOPgTOtgb3yOSIvShMgbt8CGQp6omtIG9_A";
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
    document.getElementById('qrCodeModal').addEventListener('hidden.bs.modal', function () {
        if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
        }
    });

    function start_khqr_scan() {

        if (md5Value) {
            let elapsedTime = 0;
            checkInterval = setInterval(() => {
                fetchTransactionStatus(md5Value);
                elapsedTime += 3;
                if (elapsedTime >= 90) {
                    qrCodeModal.hide();
                    clearInterval(checkInterval);
                }
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

    // Update amount value when the input changes
    const amountInput = document.getElementById("amount");
    if (amountInput) {
        amountInput.addEventListener("input", function () {
            amount = this.value;
            optionalData.amount = amount;
            individualInfo = new info("vannak_dim@cadi", "VANNAK DIM", "PHNOM PENH", optionalData);
            khqrInstance = new KHQR.BakongKHQR();
            individual = khqrInstance.generateIndividual(individualInfo);
            console.log(optionalData.amount);
        });
    }

    // Attach event listeners for all buttons with class 'btn'
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            let price = this.getAttribute('data-price');
            optionalData.amount = price;
            individualInfo = new info("vannak_dim@cadi", "VANNAK DIM", "PHNOM PENH", optionalData);
            khqrInstance = new KHQR.BakongKHQR();
            individual = khqrInstance.generateIndividual(individualInfo);
            displayQRCode();
            console.log('Button clicked with data-price:', price);
        });
    });

});
