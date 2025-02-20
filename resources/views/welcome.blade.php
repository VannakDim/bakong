<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>BAKONG KHQR</title>
    <link rel="icon" href="https://api-bakong.nbc.gov.kh/img/ic_bakong_logo_red.f4bd4b94.png" type="image/x-icon">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    {{-- Link Bootstrap --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    {{-- Bakong KHQR --}}
    <script src="{{ asset('js/khqr-1.0.6.min.js') }}"></script>

    {{-- QR Code Reader --}}
    <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>


</head>

<body class="font-sans antialiased dark:bg-black dark:text-white/50">


    <div class="container mt-5">
        <div class="max-w-sm rounded overflow-hidden shadow-lg" style="background: rgba(255, 0, 0, 0.571);padding: 50px;">
            <img src="https://bakong.nbc.gov.kh/en/images/logo.svg" alt="Sample Image" width="200" />
            <div class="px-6 py-4">
                
                <div class="font-bold text-xl mb-2">BAKONG KHQR WITH LARAVEL</div>
                <p class="text-gray-700 text-base">
                    នេះជាឧទាហរណ៍មួយក្នុងការប្រើប្រាស់ BAKONG KHQR ជាមួយនឹង Laravel ដើម្បីបង់ប្រាក់តាមរយៈ QR Code
                </p>
                    <h2 class="pt-4">Enter dynamic amount:</h2>
                    <div class="input-group mb-3 pt-2">
                        <span class="input-group-text">៛</span>
                        <input name="amount" type="number" id="amount" class="form-control"
                            placeholder="Enter amount" min="0" step="100" value="100" />
                    </div>

                    <div>
                        <div class="btn btn-primary" id="checkout">Checkout<span
                                class="fas fa-arrow-right ps-2"></span>
                        </div>
                    </div>
                
            </div>

            <!-- QR Code Modal Structure -->
            <div class="modal fade" id="qrCodeModal" tabindex="-1" aria-labelledby="qrCodeModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="qrCodeModalLabel"><span
                                    class="text-primary">ស្កែនដើម្បីបង់ប្រាក់</span></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <!-- Canvas for QR code rendering -->
                            <div class="d-flex justify-content-center">
                                <canvas id="qrCodeCanvas"></canvas>
                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


</body>

{{-- Script Bootstrap --}}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
{{-- Script jquery  --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

<script src="{{ asset('js/khqr.js') }}"></script>

</html>
