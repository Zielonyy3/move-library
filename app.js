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
        this.offsetLeft;
        this.startPositionTop;
        this.offsetTop;

        this.domElement.addEventListener('click', this.moveIt.bind(this))
    }

    moveIt(e) {
        this.moving = 1;

        this.startPositionLeft = e.clientX - (e.clientX - this.elementBound.left);
        this.startPositionTop = e.clientY - (e.clientY - this.elementBound.top);

        this.offsetLeft = e.clientX - this.elementBound.left;
        this.offsetTop = e.clientY - this.elementBound.top;

        this.domElement.style.position = 'relative';

        if (this.moving) {
            window.addEventListener('mousemove', (e) => {
                this.domElement.style.left = `${e.clientX - this.startPositionLeft - this.offsetLeft}px`;
                this.domElement.style.top = `${e.clientY - this.startPositionTop - this.offsetTop}px`;
            })
        }
    }
}

const moving = new Movables('dupa');