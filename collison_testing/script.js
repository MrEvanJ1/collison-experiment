     // Get the canvas element
     const canvas = document.getElementById("collisionCanvas");
     const ctx = canvas.getContext("2d");

     // Set canvas dimensions
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;

     // Create an array to hold the lines
     let lines = [];

     // Initialize mouse position variables
     let mouseX = canvas.width / 2;
     let mouseY = canvas.height / 2;

     // Function to handle mouse movement
     function handleMouseMove(event) {
       mouseX = event.clientX;
       mouseY = event.clientY;
     }

     // Function to handle window resizing
     function handleResize() {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
     }

     // Function to generate random colors
     function getRandomColor() {
       const letters = "0123456789ABCDEF";
       let color = "#";
       for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)];
       }
       return color;
     }

     // Line class
     class Line {
       constructor(x, y, color) {
         this.x = x;
         this.y = y;
         this.color = color;
         this.vx = Math.random() - 0.5; // Random velocity for x-axis
         this.vy = Math.random() - 0.5; // Random velocity for y-axis
         this.length = 500; // Length of the line
       }

       update() {
         this.x += this.vx;
         this.y += this.vy;

         // Check for collision with the canvas borders
         if (this.x < 0 || this.x > canvas.width) {
           this.vx *= -1;
         }
         if (this.y < 0 || this.y > canvas.height) {
           this.vy *= -1;
         }
       }

       draw() {
         ctx.beginPath();
         ctx.moveTo(this.x, this.y);
         ctx.lineTo(
           this.x + this.length * Math.cos(Math.atan2(mouseY - this.y, mouseX - this.x)),
           this.y + this.length * Math.sin(Math.atan2(mouseY - this.y, mouseX - this.x))
         );
         ctx.strokeStyle = this.color;
         ctx.lineWidth = 0.4;
         ctx.stroke();
       }
     }

     // Initialize the lines
     function initialize() {
       lines = [];
       for (let i = 0; i < 500; i++) {
         const x = Math.random() * canvas.width;
         const y = Math.random() * canvas.height;
         const color = getRandomColor();
         lines.push(new Line(x, y, color));
       }
     }

     // Update function
     function update() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       lines.forEach((line) => {
         line.update();
         line.draw();
       });

       requestAnimationFrame(update);
     }

     // Event listeners
     window.addEventListener("mousemove", handleMouseMove);
     window.addEventListener("resize", handleResize);

     // Initialize and start the animation
     initialize();
     update();