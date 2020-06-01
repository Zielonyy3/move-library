class Movables {
    constructor(name) {
        this.name = name;
        this.moveBars = [...document.querySelectorAll('.fa-bars')];
        this.elementsList = this.moveBars.map(el => el.parentNode);
        this.objectList = [];

        this.elementsList.forEach(el => {
            const object = new MoveObject(el);
            this.objectList.push(object);
        })
    }
    createElements() {}
}

class MoveObject {
    constructor(element) {
        this.moving = 0;
        this.domElement = element;
        this.elementBound = this.domElement.getBoundingClientRect();
        this.startPositionLeft;
        this.startPositionTop;
        this.offsetLeft;
        this.offsetTop;
        this.lastLeft = 0;
        this.lastTop = 0;

        this.domElement.addEventListener('click', this.moveIt.bind(this))
    }

    moveIt(e) {
        this.elementBound = this.domElement.getBoundingClientRect();
        this.startPositionLeft = e.clientX - (e.clientX - this.elementBound.left);
        this.startPositionTop = e.clientY - (e.clientY - this.elementBound.top);

        this.offsetLeft = e.clientX - this.elementBound.left;
        this.offsetTop = e.clientY - this.elementBound.top;

        this.lastLeft = this.domElement.style.left.slice(0, this.domElement.style.left.indexOf('px'));
        this.lastTop = this.domElement.style.top.slice(0, this.domElement.style.top.indexOf('px'));

        console.log(`lastL: ${this.lastLeft}, lastT: ${this.lastTop}`);

        console.log('startLeft: ' + this.startPositionLeft, 'startTop: ' + this.startPositionTop);

        // this.moving = 1;
        console.log(this.moving);
        if (this.moving) {
            this.moving = 0;
            this.domElement.style.cursor = 'default';
        } else {
            this.moving = 1;
            this.domElement.style.cursor = 'grab';
        }


        this.domElement.style.position = 'relative';


        window.addEventListener('mousemove', (e) => {
            if (this.moving == 1) {
                console.log(`clientX: ${e.clientX}, left: ${this.startPositionLeft}, offsetLeft: ${this.offsetLeft}, lastLeft: ${this.lastLeft} = ${e.clientX - this.startPositionLeft - this.offsetLeft + this.lastLeft*1}`);
                this.domElement.style.left = `${e.clientX - this.startPositionLeft - this.offsetLeft + this.lastLeft*1}px`;
                this.domElement.style.top = `${e.clientY - this.startPositionTop - this.offsetTop + this.lastTop*1}px`;
            }
        })
    }
}

const moving = new Movables('dupa');