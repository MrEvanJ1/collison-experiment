
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
          this.vx = Math.random() * 2 - 1; // Random velocity for x-axis (-1 to 1)
          this.vy = Math.random() * 2 - 1; // Random velocity for y-axis (-1 to 1)
          this.length = Math.random() * 1 + 50; // Random length of the line (50 to 150)
          this.lineWidth = Math.random() * 3 + 1; // Random line width (1 to 4)
          this.prevX = x; // Previous x position
          this.prevY = y; // Previous y position
        }

        update() {
          this.prevX = this.x;
          this.prevY = this.y;

          this.x += this.vx;
          this.y += this.vy;

          // Check for collision with the canvas borders
          if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
          }
          if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
          }

          // Check for collision with other lines
          lines.forEach((line) => {
            if (line !== this) {
              const dx = line.x - this.x;
              const dy = line.y - this.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < this.length) {
                const angle = Math.atan2(dy, dx);
                const targetX = this.x + Math.cos(angle) * this.length;
                const targetY = this.y + Math.sin(angle) * this.length;
                const ax = (targetX - line.x) * 0.02;
                const ay = (targetY - line.y) * 0.02;

                this.vx -= ax;
                this.vy -= ay;
                line.vx += ax;
                line.vy += ay;
              }
            }
          });

          // Check for interaction with mouse position
          const
          dxMouse = mouseX - this.x;
          const dyMouse = mouseY - this.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distanceMouse < this.length) {
const angleMouse = Math.atan2(dyMouse, dxMouse);
const targetXMouse = this.x + Math.cos(angleMouse) * this.length;
const targetYMouse = this.y + Math.sin(angleMouse) * this.length;
const axMouse = (targetXMouse - mouseX) * 0.02;
const ayMouse = (targetYMouse - mouseY) * 0.02;
this.vx -= axMouse;
        this.vy -= ayMouse;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.prevX, this.prevY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.lineWidth;
      ctx.stroke();
    }
  }

  // Initialize the lines
  function initialize() {
    lines = [];
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
        const color = "lightgreen";
      lines.push(new Line(x, y , color));
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

  // Initialize and start the animation
  initialize();
  update();