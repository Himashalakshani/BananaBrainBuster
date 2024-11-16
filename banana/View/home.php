<?php
include 'navigation.php'
   ?>
<!DOCTYPE html>
<html lang="en">

<head>
   <title>Banana Brain Buster</title>
   <link rel="stylesheet" type="text/css" href="../Static Assets/css/homepage.css">
   <style>
      #newGame {
         background-color: #58d68d;
         color: #fff;
         border: none;
         border-radius: 25px;
         padding: 15px 40px;
         font-size: 18px;
         font-weight: bold;
         cursor: pointer;
         transition: background-color 0.3s ease;
      }

      #newGame:hover {
         background-color: #2ecc71;
      }

      #newGame:active {
         background-color: #27ae60;
         transform: scale(0.95);
      }

      .button-container {
         display: flex;
         justify-content: center;
         margin-top: 50px;
      }
   </style>
</head>

<body class="home">
   <div class="banner_section layout_padding">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
         <div class="carousel-inner">
            <div class="carousel-item active">
               <div class="container" style="padding-left: 20px; padding-right: 20px;">
                  <div class="row">
                     <div class="col-lg-6">
                        <h1 class="banner_title">Banana Brain Buster</h1>
                        <h2 class="banner_text">Welcome to Banana Math! 🍌</h2>
                        <p class="banner_text2">Solve quick math problems and collect bananas with every correct answer.
                           It's a fun and easy way to practice your math skills. <br>
                           Perfect for all ages!<br>Start playing now and have fun with numbers!
                        </p>
                        <div class="button-container">
                           <button id="newGame">New Game</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <script src="../Static Assets/js/homepage.js"></script>
</body>

</html>