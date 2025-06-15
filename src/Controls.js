class Controls {
    constructor() {
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
        this.active = true;
        this.#keyboardListeners();
        this.#buttonListeners();
        this.#touchListeners();
    }
    
    #keyboardListeners(){

        document.onkeydown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.forward = true;
                    break;
                case 'ArrowDown':
                    this.backward = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
            }
            console.clear()
            console.table(this)
        };
        document.onkeyup = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.forward = false;
                    break;
                case 'ArrowDown':
                    this.backward = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
            }
        };
        
    }

    #buttonListeners() {
        document.getElementById('forward').addEventListener('mousedown', () => {
            this.forward = true;
        });
        document.getElementById('backward').addEventListener('mousedown', () => {
            this.backward = true;
        });
        document.getElementById('left').addEventListener('mousedown', () => {
            this.left = true;
        });
        document.getElementById('right').addEventListener('mousedown', () => {
            this.right = true;
        });

        // mouse down events
        document.getElementById('forward').addEventListener('mouseup', () => {
            this.forward = false;
        });
        document.getElementById('backward').addEventListener('mouseup', () => {
            this.backward = false;
        });
        document.getElementById('left').addEventListener('mouseup', () => {
            this.left = false;
        });
        document.getElementById('right').addEventListener('mouseup', () => {
            this.right = false;
        });
    }
    
    #touchListeners() {
        document.getElementById('forward').addEventListener('touchstart', () => {
            this.forward = true;
        });
        document.getElementById('backward').addEventListener('touchstart', () => {
            this.backward = true;
        });
        document.getElementById('left').addEventListener('touchstart', () => {
            this.left = true;
        });
        document.getElementById('right').addEventListener('touchstart', () => {
            this.right = true;
        });

        document.addEventListener('touchend', () => {
            this.forward = false;
            this.backward = false;
            this.left = false;
            this.right = false;
        });
    }
}