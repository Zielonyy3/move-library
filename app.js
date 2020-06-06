class Movables {
    constructor(name) {
        this.name = name;
        this.moveList = document.querySelector('.moveList');
        this.moveBars = [...document.querySelectorAll('.fa-bars')];
        this.elementsList = this.moveBars.map(el => el.parentNode);
        this.objectList = [];

        this.elementsList.forEach((el, i) => {
            const object = new MoveObject(this, el, i);
            this.objectList.push(object);
        })
    }
    recreateList(movedObject) {
        const tempObjectList = this.objectList.map(el => el);
        this.objectList.length = 0;

        console.log(movedObject);
        tempObjectList.splice(movedObject.objectIndex, 1);
        console.warn(movedObject.newIndex);

        tempObjectList.forEach((obj, i) => {
            if (i != movedObject.newIndex)
                this.objectList.push(obj);
            else {
                this.objectList.push(movedObject);
                this.objectList.push(obj);
            }
        })

        this.objectList.forEach((el, i) => {
            el.domElement.textContent = i;
            console.log(el.domElement);
        })
    }
}

class MoveObject {
    constructor(creator, element, objectIndex) {
        this.creator = creator;
        this.moving = 0;
        this.objectIndex = objectIndex;
        this.newIndex;
        this.moveElementListenerBind = this.moveElement.bind(this);

        this.domElement = element;
        this.elementBars = this.domElement.querySelector('.fa-bars');

        this.elementBound = this.domElement.getBoundingClientRect();
        this.offsetTop = this.elementBound.top;
        this.offsetLeft = this.elementBound.left;

        this.eventBindHandler = this.moveElement.bind(this);

        this.domElement.addEventListener('click', this.moveIt.bind(this))
    }

    moveIt(e) {
        console.log(this.domElement.offsetHeight);
        this.creator.objectList.forEach(el => el.domElement.style.backgroundColor = 'red');

        this.elementBound = this.domElement.getBoundingClientRect();

        this.offsetTop = this.elementBound.top;
        this.offsetLeft = this.elementBound.left;

        this.pointY = e.clientY - this.offsetTop;
        this.pointX = e.clientX - this.offsetLeft;

        this.newPositionTop = e.clientY - this.pointY - this.offsetTop;

        if (this.moving) {
            this.moving = 0;
            this.domElement.style.cursor = 'default';
            window.removeEventListener('mousemove', this.eventBindHandler)
            const movedObject = this;
            this.creator.recreateList(movedObject);
        } else {
            this.moving = 1;
            this.domElement.style.cursor = 'grab';
            this.domElement.style.position = 'relative';
            this.domElement.style.zIndex = 1;
            this.domElement.style.transition = '0s';
            window.addEventListener('mousemove', this.eventBindHandler)
            console.log();
        }
    }

    moveElement(e) {
        this.newPositionTop = e.clientY - this.pointY - this.offsetTop;
        this.domElement.style.top = this.newPositionTop + 'px';
        this.checkPosition()
        // this.domElement.style.left = `${e.clientX - this.clickX - this.offsetLeft}px`;
    }

    checkPosition() {
        console.log(this.creator.objectList[1].offsetTop);
        let index = this.objectIndex;
        this.creator.objectList.forEach((el, i) => {
            if (i != this.objectIndex && i != this.objectIndex + 1) {
                el.domElement.style.position = 'relative';
                el.domElement.style.top = '0';
            }

            if (this.newPositionTop + this.offsetTop - this.domElement.offsetHeight / 2 > el.offsetTop) {
                if (i != this.objectIndex) {
                    el.domElement.style.top = '-3em';
                }
                index = i;
            } else {
                if (el.objectIndex != i + 1) {
                    el.domElement.style.backgroundColor = 'red';
                    this.creator.objectList[i + 1].domElement.style.backgroundColor = 'blue';
                }
                el.domElement.style.top = '3em';
            }

            if (i == index)
                el.domElement.style.backgroundColor = 'green';



        })
        // if (index != this.objectIndex) {
        //     // this.creator.objectList[index].domElement.style.position = 'relative';
        //     this.creator.objectList[index].domElement.style.top = '-3em';
        //     this.creator.objectList[index + 1].domElement.style.top = '3em';
        // }

        this.newIndex = index;
        this.domElement.textContent = this.newIndex;
    }

}

const moving = new Movables('dupa');