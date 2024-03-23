<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found</title>
    <style>
        @font-face {
    font-family: "GT Ultra";
    src: url("./fonts/GTUltra/GTUltraFine-Black.otf") format("opentype");
    font-weight: bolder;
    font-display: swap;
    }

    @font-face {
    font-family: "GT Ultra";
    src: url("./fonts/GTUltra/GTUltraFine-Thin.otf") format("opentype");
    font-weight: 100;
    font-display: swap;
    }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            background-color: #080808;
            color: #e8e8e8;
            font-family: 'GT Ultra', serif;
        }

        .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            justify-content: center;
        }

        h1, h2 {
            font-size: 62px;
            font-weight: 200;
        }

        h2 {
            margin-bottom: 20px;
        }

        p {
            font-weight: 100;
            width: 90vw;
            font-size: 24px;
        }

                /* Lines */
        .lines {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        right: 0;
        height: 100%;
        width: 100vw;
        z-index: -1;
        }

        .line {
        position: absolute;
        height: 15vh;
        width: 1px;
        top: -50%;
        left: 0; /* Centered initially */
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            #ffffff 75%,
            #ffffff 100%
        );
        animation: drop 4s 0s infinite;
        animation-fill-mode: forwards;
        animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
        }

        .line:nth-child(1) {
        left: calc(50% - 3 * 20%); /* Centering the first line */
        -webkit-animation-delay: 1s;
        animation-delay: 1s;
        }

        .line:nth-child(2) {
        left: calc(50% - 2 * 20%); /* Positioning the second line */
        -webkit-animation-delay: 3s;
        animation-delay: 3s;
        }

        .line:nth-child(3) {
        left: calc(50% - 1 * 20%); /* Positioning the third line */
        -webkit-animation-delay: 2.5s;
        animation-delay: 2.5s;
        }

        .line:nth-child(4) {
        left: 50%; /* Positioning the fourth line (center) */
        -webkit-animation-delay: 4s;
        animation-delay: 4s;
        }

        .line:nth-child(5) {
        left: calc(50% + 1 * 20%); /* Positioning the fifth line */
        -webkit-animation-delay: 3s;
        animation-delay: 3s;
        }

        .line:nth-child(6) {
        left: calc(50% + 2 * 20%); /* Positioning the sixth line */
        -webkit-animation-delay: 5s;
        animation-delay: 5s;
        }

        .line:nth-child(7) {
        left: calc(50% + 3 * 20%); /* Positioning the seventh line */
        -webkit-animation-delay: 2.2s;
        animation-delay: 2.2s;
        }

        @-webkit-keyframes drop {
        0% {
            top: -50%;
        }
        100% {
            top: 110%;
        }
        }

        @keyframes drop {
        0% {
            top: -50%;
        }
        100% {
            top: 110%;
        }
        }

    </style>
</head>
<body>
    <div class="lines" aria-hidden="true">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    <div class="container">
        <h1>404</h1>
        <h2>Lost in the Vortex!</h2>
        <p>Our team is navigating through the cosmic chaos to bring you back.<br>Hang tight or explore other stellar destinations!"</p>
    </div>
</body>
</html>